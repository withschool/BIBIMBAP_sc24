package com.withSchool.service.billing;

import com.withSchool.dto.payment.ResPaymentRecordDTO;
import com.withSchool.entity.payment.PaymentFail;
import com.withSchool.entity.payment.PaymentRecord;
import com.withSchool.entity.payment.Subscription;
import com.withSchool.entity.school.SchoolInformation;
import com.withSchool.repository.payment.PaymentFailRepository;
import com.withSchool.repository.payment.PaymentRecordRepository;
import com.withSchool.repository.payment.SubscriptionRepository;
import com.withSchool.repository.school.SchoolInformationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BillingServiceTest {

    @InjectMocks
    private BillingService billingService;

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @Mock
    private SchoolInformationRepository schoolInformationRepository;

    @Mock
    private PaymentRecordRepository paymentRecordRepository;

    @Mock
    private PaymentFailRepository paymentFailRepository;

    @Mock
    private RestTemplate restTemplate;

    @Value("${portone.api.secret}")
    private String portOneApiSecret;

    private Subscription subscription;
    private SchoolInformation schoolInformation;

    @BeforeEach
    public void setUp() {
        subscription = new Subscription();
        subscription.setBillingKey("test-key");
        subscription.setStartDate(LocalDate.now().minusMonths(1));
        subscription.setPlan(1);

        schoolInformation = new SchoolInformation();
        schoolInformation.setSchoolId(1L);
        subscription.setSchoolInformation(schoolInformation);
    }

    @Test
    public void testCalculateAmount() {
        int amount = billingService.calculateAmount(subscription);
        assertEquals(150000 * LocalDate.now().lengthOfMonth(), amount);
    }

    @Test
    public void testProcessPaymentSuccess() {
        String paymentId = UUID.randomUUID().toString();
        String url = "https://api.portone.io/payments/" + paymentId + "/billing-key";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + portOneApiSecret);
        headers.set("Content-Type", "application/json");

        Map<String, Object> paymentDetails = new HashMap<>();
        paymentDetails.put("billingKey", subscription.getBillingKey());
        paymentDetails.put("orderName", "월간 이용권 정기결제 실패");

        Map<String, Object> amountDetails = new HashMap<>();
        amountDetails.put("total", 150000);

        paymentDetails.put("amount", amountDetails);
        paymentDetails.put("currency", "KRW");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(paymentDetails, headers);

        ResponseEntity<String> responseEntity = new ResponseEntity<>("", HttpStatus.OK);

        when(restTemplate.exchange(url, HttpMethod.POST, entity, String.class)).thenReturn(responseEntity);

        billingService.processPayment(subscription, 150000);

        ArgumentCaptor<PaymentRecord> paymentRecordCaptor = ArgumentCaptor.forClass(PaymentRecord.class);
        verify(paymentRecordRepository, times(2)).save(paymentRecordCaptor.capture());
        List<PaymentRecord> savedRecords = paymentRecordCaptor.getAllValues();

        assertFalse(savedRecords.get(0).isSuccess());
        assertTrue(savedRecords.get(1).isSuccess());
    }

    @Test
    public void testProcessPaymentFailure() {
        String paymentId = UUID.randomUUID().toString();
        String url = "https://api.portone.io/payments/" + paymentId + "/billing-key";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + portOneApiSecret);
        headers.set("Content-Type", "application/json");

        Map<String, Object> paymentDetails = new HashMap<>();
        paymentDetails.put("billingKey", subscription.getBillingKey());
        paymentDetails.put("orderName", "월간 이용권 정기결제 실패");

        Map<String, Object> amountDetails = new HashMap<>();
        amountDetails.put("total", 150000);

        paymentDetails.put("amount", amountDetails);
        paymentDetails.put("currency", "KRW");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(paymentDetails, headers);

        ResponseEntity<String> responseEntity = new ResponseEntity<>("", HttpStatus.BAD_REQUEST);

        when(restTemplate.exchange(url, HttpMethod.POST, entity, String.class)).thenReturn(responseEntity);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            billingService.processPayment(subscription, 150000);
        });

        assertTrue(exception.getMessage().contains("결제 실패"));

        ArgumentCaptor<PaymentRecord> paymentRecordCaptor = ArgumentCaptor.forClass(PaymentRecord.class);
        verify(paymentRecordRepository, times(1)).save(paymentRecordCaptor.capture());

        PaymentRecord savedRecord = paymentRecordCaptor.getValue();
        assertFalse(savedRecord.isSuccess());
    }

    @Test
    public void testGetPaymentRecord() {
        PaymentRecord record1 = PaymentRecord.builder()
                .paymentId(UUID.randomUUID().toString())
                .amount(150000)
                .paymentDate(LocalDateTime.now().minusDays(1))
                .subscription(subscription)
                .success(true)
                .build();

        PaymentRecord record2 = PaymentRecord.builder()
                .paymentId(UUID.randomUUID().toString())
                .amount(150000)
                .paymentDate(LocalDateTime.now())
                .subscription(subscription)
                .success(false)
                .build();

        when(paymentRecordRepository.findAllBySchoolId(1L)).thenReturn(Arrays.asList(record1, record2));

        List<ResPaymentRecordDTO> records = billingService.getPaymentRecord(1L);

        assertEquals(2, records.size());
        assertTrue(records.get(0).getPaymentDate().isAfter(records.get(1).getPaymentDate()));
    }
}
