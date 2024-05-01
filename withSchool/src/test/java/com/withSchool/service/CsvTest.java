package com.withSchool.service;

import com.withSchool.dto.csv.CsvRequestDTO;
import com.withSchool.repository.user.UserRepository;
import com.withSchool.service.csv.CsvService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
public class CsvTest {
    @Autowired
    private CsvService csvService;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void register() {
        CsvRequestDTO dto = CsvRequestDTO.builder()
                .file(null)
                .id("dd1")
                .build();
        //System.out.println(userRepository.findById(dto.getUserId()).get().getName());
        csvService.registerUser(dto);
    }
}
