import { useDaumPostcodePopup } from 'react-daum-postcode';

function DaumPost(postcodeScriptUrl : any){
    //클릭 시 수행될 팝업 생성 함수
    const open = useDaumPostcodePopup(postcodeScriptUrl);
  
    const handleComplete = (data : any) => {
      let fullAddress = data.address;
      let extraAddress = ''; //추가될 주소
      let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
      if (data.addressType === 'R') { //주소타입이 도로명주소일 경우
        if (data.bname !== '') {
          extraAddress += data.bname; //법정동, 법정리
        }
        if (data.buildingName !== '') { //건물명
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        //지역주소 제외 전체주소 치환
        fullAddress = fullAddress.replace(localAddress, '');
        //조건 판단 완료 후 지역 주소 및 상세주소 state 수정
        props.setAddressObj({
          areaAddress: localAddress,
          townAddress: fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '')
        });
      }
    }
    //클릭 시 발생할 이벤트
    const handleClick = () => {
      //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleComplete});
    }
    return <button type="button" onClick={handleClick}>주소찾기</button>
   }
  
  export default DaumPost;