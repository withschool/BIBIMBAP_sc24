import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconX from '../../components/Icon/IconX';
import IconDownload from '../../components/Icon/IconDownload';
import IconEye from '../../components/Icon/IconEye';
import IconSend from '../../components/Icon/IconSend';
import IconSave from '../../components/Icon/IconSave';
import * as PortOne from "@portone/browser-sdk/v2";

const InvoiceAdd = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('결제 진행'));
    });
    const currencyList = ['KRW - 대한민국 원', 'USD - 미국 달러', 'JPY - 일본 엔', 'CNY - 중국 위안', 'EUR - 유로', 'GBP - 영국 파운드', 'AUD - 호주 달러'];
    const [items, setItems] = useState<any>([
        {
            id: 1,
            title: '학생 138명 (명당 2만원)',
            description: '',
            rate: 20000,
            quantity: 138,
            amount: 2760000,
        },
        {
            id: 2,
            title: '교사 27명 (명당 2만원)',
            description: '',
            rate: 20000,
            quantity: 27,
            amount: 540000,
        },
        {
            id: 3,
            title: '기타 4명(관리자 등) (명당 2만원)',
            description: '',
            rate: 20000,
            quantity: 4,
            amount: 80000,
        },
    ]);

    const addItem = () => {
        let maxId = 0;
        maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;

        setItems([...items, { id: maxId + 1, title: '', description: '', rate: 0, quantity: 0, amount: 0 }]);
    };

    const removeItem = (item: any = null) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeQuantityPrice = (type: string, value: string, id: number) => {
        const list = items;
        const item = list.find((d: any) => d.id === id);
        if (type === 'quantity') {
            item.quantity = Number(value);
        }
        if (type === 'price') {
            item.amount = Number(value);
        }
        setItems([...list]);
    };


    // //결제 관련 로직

    // const response = await PortOne.requestPayment({
    //     // Store ID 설정
    //     storeId: "store-b2c528ec-59c4-420b-8e47-5aac076f4573",
    //     // 채널 키 설정
    //     channelKey: "channel-key-893597d6-e62d-410f-83f9-119f530b4b11",
    //     paymentId: `payment-${crypto.randomUUID()}`,
    //     orderName: "나이키 와플 트레이너 2 SD",
    //     totalAmount: 1000,
    //     currency: "CURRENCY_KRW",
    //     payMethod: "CARD",
    //   });
      

    return (
        <div className="flex xl:flex-row flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className="flex justify-between flex-wrap px-4">
                    <div className="mb-6 lg:w-1/2 w-full">
                        <div className="flex items-center text-black dark:text-white shrink-0">
                            <img src="/assets/images/logo.svg" alt="img" className="w-14" />
                        </div>
                        <div className="space-y-1 mt-6 text-gray-500 dark:text-gray-400">
                            <div>경기 수원시 영통구 월드컵로 206</div>
                            <div>withschool@gmail.com</div>
                            <div>(031) 123-4567</div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full lg:max-w-fit">
                        <div className="flex items-center">
                            <label htmlFor="number" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                결제 정보 번호
                            </label>
                            <input id="number" type="text" name="inv-num" className="form-input lg:w-[250px] w-2/3" placeholder="#8801" />
                        </div>
                        <div className="flex items-center mt-4">
                            <label htmlFor="invoiceLabel" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                결제 라벨
                            </label>
                            <input id="invoiceLabel" type="text" name="inv-label" className="form-input lg:w-[250px] w-2/3" placeholder="결제 라벨" />
                        </div>
                        <div className="flex items-center mt-4">
                            <label htmlFor="startDate" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                결제 날짜
                            </label>
                            <input id="startDate" type="date" name="inv-date" className="form-input lg:w-[250px] w-2/3" />
                        </div>
                        <div className="flex items-center mt-4">
                            <label htmlFor="dueDate" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                결제 마감일
                            </label>
                            <input id="dueDate" type="date" name="due-date" className="form-input lg:w-[250px] w-2/3" />
                        </div>
                    </div>
                </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="mt-8 px-4">
                    <div className="flex justify-between lg:flex-row flex-col">
                        <div className="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
                            <div className="text-lg">청구 대상 :-</div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-name" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    이름
                                </label>
                                <input id="reciever-name" type="text" name="reciever-name" className="form-input flex-1" placeholder="이름 입력" />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-email" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    이메일
                                </label>
                                <input id="reciever-email" type="email" name="reciever-email" className="form-input flex-1" placeholder="이메일 입력" />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-address" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    주소
                                </label>
                                <input id="reciever-address" type="text" name="reciever-address" className="form-input flex-1" placeholder="주소 입력" />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-number" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    전화번호
                                </label>
                                <input id="reciever-number" type="text" name="reciever-number" className="form-input flex-1" placeholder="전화번호 입력" />
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <div className="text-lg">결제 정보:</div>
                            <div className="flex items-center mt-4">
                                <label htmlFor="acno" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    계좌 번호
                                </label>
                                <input id="acno" type="text" name="acno" className="form-input flex-1" placeholder="계좌 번호 입력" />
                            </div>
                            <div className="flex items-center mt-4">
                                <label htmlFor="bank-name" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    은행 이름
                                </label>
                                <input id="bank-name" type="text" name="bank-name" className="form-input flex-1" placeholder="은행 이름 입력" />
                            </div>
                            <div className="flex items-center mt-4">
                                <label htmlFor="swift-code" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    SWIFT 번호
                                </label>
                                <input id="swift-code" type="text" name="swift-code" className="form-input flex-1" placeholder="SWIFT 번호 입력" />
                            </div>
                            <div className="flex items-center mt-4">
                                <label htmlFor="iban-code" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    IBAN 번호
                                </label>
                                <input id="iban-code" type="text" name="iban-code" className="form-input flex-1" placeholder="IBAN 번호 입력" />
                            </div>
                            <div className="flex items-center mt-4">
                                <label htmlFor="country" className="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">
                                    국가
                                </label>
                                <select id="country" name="country" className="form-select flex-1">
                                    <option value="">국가 선택</option>
                                    <option value="United States">미국</option>
                                    <option value="United Kingdom">영국</option>
                                    <option value="Canada">캐나다</option>
                                    <option value="Australia">호주</option>
                                    <option value="Germany">독일</option>
                                    <option value="Sweden">스웨덴</option>
                                    <option value="Denmark">덴마크</option>
                                    <option value="Norway">노르웨이</option>
                                    <option value="New-Zealand">뉴질랜드</option>
                                    <option value="Afghanistan">아프가니스탄</option>
                                    <option value="Albania">알바니아</option>
                                    <option value="Algeria">알제리</option>
                                    <option value="American-Samoa">안도라</option>
                                    <option value="Angola">앙골라</option>
                                    <option value="Antigua Barbuda">앤티가 바부다</option>
                                    <option value="Argentina">아르헨티나</option>
                                    <option value="Armenia">아르메니아</option>
                                    <option value="Aruba">아루바</option>
                                    <option value="Austria">오스트리아</option>
                                    <option value="Azerbaijan">아제르바이잔</option>
                                    <option value="Bahamas">바하마</option>
                                    <option value="Bahrain">바레인</option>
                                    <option value="Bangladesh">방글라데시</option>
                                    <option value="Barbados">바베이도스</option>
                                    <option value="Belarus">벨라루스</option>
                                    <option value="Belgium">벨기에</option>
                                    <option value="Belize">벨리즈</option>
                                    <option value="Benin">베냉</option>
                                    <option value="Bermuda">버뮤다</option>
                                    <option value="Bhutan">부탄</option>
                                    <option value="Bolivia">볼리비아</option>
                                    <option value="Bosnia">보스니아 헤르체고비나</option>
                                    <option value="Botswana">보츠와나</option>
                                    <option value="Brazil">브라질</option>
                                    <option value="British">영국령 버진아일랜드</option>
                                    <option value="Brunei">브루나이</option>
                                    <option value="Bulgaria">불가리아</option>
                                    <option value="Burkina">부르키나파소</option>
                                    <option value="Burundi">부룬디</option>
                                    <option value="Cambodia">캄보디아</option>
                                    <option value="Cameroon">카메룬</option>
                                    <option value="Cape">카보베르데</option>
                                    <option value="Cayman">케이맨 제도</option>
                                    <option value="Central-African">중앙아프리카공화국</option>
                                    <option value="Chad">차드</option>
                                    <option value="Chile">칠레</option>
                                    <option value="China">중국</option>
                                    <option value="Colombia">콜롬비아</option>
                                    <option value="Comoros">코모로</option>
                                    <option value="Costa-Rica">코스타리카</option>
                                    <option value="Croatia">크로아티아</option>
                                    <option value="Cuba">쿠바</option>
                                    <option value="Cyprus">키프로스</option>
                                    <option value="Czechia">체코</option>
                                    <option value="Côte">코트디부아르</option>
                                    <option value="Djibouti">지부티</option>
                                    <option value="Dominica">도미니카</option>
                                    <option value="Dominican">도미니카공화국</option>
                                    <option value="Ecuador">에콰도르</option>
                                    <option value="Egypt">이집트</option>
                                    <option value="El-Salvador">엘살바도르</option>
                                    <option value="Equatorial-Guinea">적도 기니</option>
                                    <option value="Eritrea">에리트레아</option>
                                    <option value="Estonia">에스토니아</option>
                                    <option value="Ethiopia">에티오피아</option>
                                    <option value="Fiji">피지</option>
                                    <option value="Finland">핀란드</option>
                                    <option value="France">프랑스</option>
                                    <option value="Gabon">가봉</option>
                                    <option value="Georgia">조지아</option>
                                    <option value="Ghana">가나</option>
                                    <option value="Greece">그리스</option>
                                    <option value="Grenada">그레나다</option>
                                    <option value="Guatemala">과테말라</option>
                                    <option value="Guernsey">건지</option>
                                    <option value="Guinea">기니</option>
                                    <option value="Guinea-Bissau">기니비사우</option>
                                    <option value="Guyana">가이아나</option>
                                    <option value="Haiti">아이티</option>
                                    <option value="Honduras">온두라스</option>
                                    <option value="Hong-Kong">홍콩</option>
                                    <option value="Hungary">헝가리</option>
                                    <option value="Iceland">아이슬란드</option>
                                    <option value="India">인도</option>
                                    <option value="Indonesia">인도네시아</option>
                                    <option value="Iran">이란</option>
                                    <option value="Iraq">이라크</option>
                                    <option value="Ireland">아일랜드</option>
                                    <option value="Israel">이스라엘</option>
                                    <option value="Italy">이탈리아</option>
                                    <option value="Jamaica">자메이카</option>
                                    <option value="Japan">일본</option>
                                    <option value="Jordan">요르단</option>
                                    <option value="Kazakhstan">카자흐스탄</option>
                                    <option value="Kenya">케냐</option>
                                    <option value="Kuwait">쿠웨이트</option>
                                    <option value="Kyrgyzstan">키르기스스탄</option>
                                    <option value="Laos">라오스</option>
                                    <option value="Latvia">라트비아</option>
                                    <option value="Lebanon">레바논</option>
                                    <option value="Lesotho">레소토</option>
                                    <option value="Liberia">라이베리아</option>
                                    <option value="Libya">리비아</option>
                                    <option value="Liechtenstein">리히텐슈타인</option>
                                    <option value="Lithuania">리투아니아</option>
                                    <option value="Luxembourg">룩셈부르크</option>
                                    <option value="Macedonia">마케도니아</option>
                                    <option value="Madagascar">마다가스카르</option>
                                    <option value="Malawi">말라위</option>
                                    <option value="Malaysia">말레이시아</option>
                                    <option value="Maldives">몰디브</option>
                                    <option value="Mali">말리</option>
                                    <option value="Malta">몰타</option>
                                    <option value="Mauritania">모리타니</option>
                                    <option value="Mauritius">모리셔스</option>
                                    <option value="Mexico">멕시코</option>
                                    <option value="Moldova">몰도바</option>
                                    <option value="Monaco">모나코</option>
                                    <option value="Mongolia">몽골</option>
                                    <option value="Montenegro">몬테네그로</option>
                                    <option value="Morocco">모로코</option>
                                    <option value="Mozambique">모잠비크</option>
                                    <option value="Myanmar">미얀마</option>
                                    <option value="Namibia">나미비아</option>
                                    <option value="Nepal">네팔</option>
                                    <option value="Netherlands">네덜란드</option>
                                    <option value="Nicaragua">니카라과</option>
                                    <option value="Niger">니제르</option>
                                    <option value="Nigeria">나이지리아</option>
                                    <option value="North-Korea">북한</option>
                                    <option value="Oman">오만</option>
                                    <option value="Pakistan">파키스탄</option>
                                    <option value="Palau">팔라우</option>
                                    <option value="Palestinian">팔레스타인</option>
                                    <option value="Panama">파나마</option>
                                    <option value="Papua">파푸아뉴기니</option>
                                    <option value="Paraguay">파라과이</option>
                                    <option value="Peru">페루</option>
                                    <option value="Philippines">필리핀</option>
                                    <option value="Poland">폴란드</option>
                                    <option value="Portugal">포르투갈</option>
                                    <option value="Puerto">푸에르토리코</option>
                                    <option value="Qatar">카타르</option>
                                    <option value="Romania">루마니아</option>
                                    <option value="Russia">러시아</option>
                                    <option value="Rwanda">르완다</option>
                                    <option value="Réunion">레위니옹</option>
                                    <option value="Samoa">사모아</option>
                                    <option value="San-Marino">산마리노</option>
                                    <option value="Saudi-Arabia">사우디아라비아</option>
                                    <option value="Senegal">세네갈</option>
                                    <option value="Serbia">세르비아</option>
                                    <option value="Seychelles">세이셸</option>
                                    <option value="Sierra-Leone">시에라리온</option>
                                    <option value="Singapore">싱가포르</option>
                                    <option value="Slovakia">슬로바키아</option>
                                    <option value="Slovenia">슬로베니아</option>
                                    <option value="Solomon-Islands">솔로몬 제도</option>
                                    <option value="Somalia">소말리아</option>
                                    <option value="South-Africa">남아프리카공화국</option>
                                    <option value="South-Korea">대한민국</option>
                                    <option value="Spain">스페인</option>
                                    <option value="Sri-Lanka">스리랑카</option>
                                    <option value="Sudan">수단</option>
                                    <option value="Suriname">수리남</option>
                                    <option value="Swaziland">에스와티니</option>
                                    <option value="Switzerland">스위스</option>
                                    <option value="Syria">시리아</option>
                                    <option value="Sao-Tome-and-Principe">상투메 프린시페</option>
                                    <option value="Tajikistan">타지키스탄</option>
                                    <option value="Tanzania">탄자니아</option>
                                    <option value="Thailand">태국</option>
                                    <option value="Timor-Leste">동티모르</option>
                                    <option value="Togo">토고</option>
                                    <option value="Tonga">통가</option>
                                    <option value="Trinidad-and-Tobago">트리니다드 토바고</option>
                                    <option value="Tunisia">튀니지</option>
                                    <option value="Turkey">터키</option>
                                    <option value="Turkmenistan">투르크메니스탄</option>
                                    <option value="Uganda">우간다</option>
                                    <option value="Ukraine">우크라이나</option>
                                    <option value="UAE">아랍에미리트</option>
                                    <option value="Uruguay">우루과이</option>
                                    <option value="Uzbekistan">우즈베키스탄</option>
                                    <option value="Vanuatu">바누아투</option>
                                    <option value="Venezuela">베네수엘라</option>
                                    <option value="Vietnam">베트남</option>
                                    <option value="Yemen">예멘</option>
                                    <option value="Zambia">잠비아</option>
                                    <option value="Zimbabwe">짐바브웨</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>항목</th>
                                    <th className="w-1">수량</th>
                                    <th className="w-1">가격</th>
                                    <th>합계</th>
                                    <th className="w-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length <= 0 && (
                                    <tr>
                                        <td colSpan={5} className="!text-center font-semibold">
                                            항목이 없습니다
                                        </td>
                                    </tr>
                                )}
                                {items.map((item: any) => {
                                    return (
                                        <tr className="align-top" key={item.id}>
                                            <td>
                                                <input type="text" className="form-input min-w-[200px]" placeholder="항목 이름 입력" defaultValue={item.title} />
                                                <textarea className="form-textarea mt-4" placeholder="설명 입력" defaultValue={item.description}></textarea>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="수량"
                                                    min={0}
                                                    defaultValue={item.quantity}
                                                    onChange={(e) => changeQuantityPrice('quantity', e.target.value, item.id)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="가격"
                                                    min={0}
                                                    defaultValue={item.amount}
                                                    onChange={(e) => changeQuantityPrice('price', e.target.value, item.id)}
                                                />
                                            </td>
                                            <td>₩{item.quantity * item.amount}</td>
                                            <td>
                                                <button type="button" onClick={() => removeItem(item)}>
                                                    <IconX className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col mt-6 px-4">
                        <div className="sm:mb-0 mb-6">
                            <button type="button" className="btn btn-primary" onClick={() => addItem()}>
                                항목 추가
                            </button>
                        </div>
                        <div className="sm:w-2/5">
                            <div className="flex items-center justify-between">
                                <div>소계</div>
                                <div>₩0.00</div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div>세금(%)</div>
                                <div>0%</div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div>배송비(₩)</div>
                                <div>₩0.00</div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div>할인(%)</div>
                                <div>0%</div>
                            </div>
                            <div className="flex items-center justify-between mt-4 font-semibold">
                                <div>총합계</div>
                                <div>₩0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 px-4">
                    <label htmlFor="notes">비고</label>
                    <textarea id="notes" name="notes" className="form-textarea min-h-[130px]" placeholder="비고..."></textarea>
                </div>
            </div>
            <div className="xl:w-96 w-full xl:mt-0 mt-6">
                <div className="panel mb-5">
                    <label htmlFor="currency">통화</label>
                    <select id="currency" name="currency" className="form-select">
                        {currencyList.map((i) => (
                            <option key={i}>{i}</option>
                        ))}
                    </select>
                    <div className="mt-4">
                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="tax">세금(%) </label>
                                <input id="tax" type="number" name="tax" className="form-input" defaultValue={0} placeholder="세금" />
                            </div>
                            <div>
                                <label htmlFor="discount">할인(%) </label>
                                <input id="discount" type="number" name="discount" className="form-input" defaultValue={0} placeholder="할인" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <label htmlFor="shipping-charge">배송비(₩) </label>
                            <input id="shipping-charge" type="number" name="shipping-charge" className="form-input" defaultValue={0} placeholder="배송비" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="payment-method">결제 방법</label>
                        <select id="payment-method" name="payment-method" className="form-select">
                            <option value=" ">결제 방법 선택</option>
                            <option value="bank">은행 계좌</option>
                            <option value="kakao">카카오뱅크</option>
                            <option value="silsi">실기간 계좌 이체</option>
                        </select>
                    </div>
                </div>
                <div className="panel">
                    <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        <button type="button" className="btn btn-success w-full gap-2">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            결제하기
                        </button>

                        <button type="button" className="btn btn-info w-full gap-2">
                            <IconSend className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            이메일 전송
                        </button>

                        <Link to="/apps/invoice/preview" className="btn btn-primary w-full gap-2">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            미리보기
                        </Link>

                        <button type="button" className="btn btn-secondary w-full gap-2">
                            <IconDownload className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            내역 다운로드
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceAdd;
