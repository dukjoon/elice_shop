const orderBtn = document.getElementById('orderButton');
const btn = document.getElementById('searchAddressButton');
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const postalCodeInput = document.querySelector('#postalCode');
const searchAddressButton = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBox = document.querySelector('#requestSelectBox');

btn.addEventListener('click', addressSearch);
orderBtn.addEventListener('click', orderHandler);


async function addressSearch(){
     new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';
      

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();

   

}



async function orderHandler(){
    const receiverName = receiverNameInput.value;
    const receiverPhoneNumber = receiverPhoneNumberInput.value;
    const postalCode = postalCodeInput.value;
    const address1 = address1Input.value;
    const address2 = address2Input.value;
    const request = requestSelectBox.value;

  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
   return alert("배송지 정보를 모두 입력해 주세요.")
   
  }


 const jsonData = {
    receiverName, receiverPhoneNumber, postalCode, address1, address2, request
 }


  const res = await fetch(`https://${window.location.hostname}:8190/api/order`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  });
  
  if(res.status === 201){
    return alert('주문에 성공하였습니다!')
  }else{
    return alert('주문에 실패하였습니다..')
  }

    
}   