import * as Api from '/api.js';

// ==================== <Category> ====================

// category create (insert)

const insert = document.querySelector('.c_insert');
const insertName = insert.querySelector('#name');
const insertBtn = insert.querySelector('#btn');

insertBtn.addEventListener('click', async () => {
  const name = insertName.value;
  try {
    const data = { name };
    console.log('data : ', data);
    const res = await Api.post('/api/category', data);

    alert(`${res.result.name} ${res.message}`);

    // 로그인 페이지 이동
    window.location.href = '/admin';
  } catch (err) {
    alert(err);
    // name is already exist 메세지 어떻게 따오지?
  }
});

// category read

const read = document.querySelector('.c_get');
const readName = read.querySelector('#name');
const readBtn = read.querySelector('#btn');

readBtn.addEventListener('click', async () => {
  const params = readName.value;
  try {
    console.log('params : ', params);
    const res = await Api.get('/api/category', params);

    if (!params && !res) alert('카테고리가 없습니다.');
    else if (params && !res) alert(`${params} 라는 카테고리는 없습니다.`);
    else alert('read 완료');
    console.log('res : ', res);
    // 로그인 페이지 이동
    window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// category update (질문 3개)

const update = document.querySelector('.c_update');
const current = update.querySelector('#currentCategoryName');
const change = update.querySelector('#nameToChange');
const updateBtn = update.querySelector('#btn');

updateBtn.addEventListener('click', async () => {
  const currentCategoryName = current.value;
  const nameToChange = change.value;
  try {
    const data = { currentCategoryName, nameToChange };
    console.log('data : ', data);
    const res = await Api.patch('/api/category', data);

    // 질문 1) params 필요 없지 않음? api.js 의 58이 아니라 59번째 줄 처럼 params 없애니까 되던데?
    // 질문 2) update가 아니라 updateOneAndUpdate는 안됨? 지금 상황에서는 Update가 안되는데, 그 이유가 궁금함!
    alert('update 완료');
    console.log('res : ', res); // update 메소드는 return 값이 없어서, res 출력해보면, message 만 도착함!
    // // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
    // 질문 3) error 메세지 어떻게 따오지?
  }
});

// category delete (질문하고 해결하기)

const del = document.querySelector('.c_delete');
const deleteName = del.querySelector('#name');
const deleteBtn = del.querySelector('#btn');

deleteBtn.addEventListener('click', async () => {
  const name = deleteName.value;
  try {
    // const data = { name };
    console.log('name : ', name);
    const res = await Api.delete('/api/category', name);
    // 질문 1) delete 도 deleteOne이나, 이런 걸로 하지 않은 이유 여쭤보기
    // 질문 2) 이것도 patch 처럼 왜 params 를 넣었는지 여쭤보기 (api.js 91, 92줄)
    // 질문 3) 여기서도 update 때와 마찬가지로, 삭제가 제대로 되지 않는다! params 넣는 것과 관계가 있는지?!
    alert(`${name} category deleted`);
    console.log(res);
    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
    // error 메세지 어떻게 따오지?
  }
});

// ==================== <Order> ====================

// Order create (insert)

const insertOrder = document.querySelector('.o_insert');
const currentUserId = insertOrder.querySelector('#user_id');
const fullName = insertOrder.querySelector('#fullName');
const postalCode = insertOrder.querySelector('#postalCode');
const address1 = insertOrder.querySelector('#address1');
const address2 = insertOrder.querySelector('#address2');
const phoneNumber = insertOrder.querySelector('#phoneNumber');
const order_data = insertOrder.querySelector('#order_data');
const price = insertOrder.querySelector('#price');
const quantity = insertOrder.querySelector('#quantity');
const request = insertOrder.querySelector('#request');
const insertOrderBtn = insertOrder.querySelector('#btn');

insertOrderBtn.addEventListener('click', async () => {
  try {
    const data = {
      // 질문) user_id, address 의 _id는 저절로 생기는 거 그냥 냅두면 되는건지?!
      fullName: fullName.value,
      address: {
        postalCode: postalCode.value,
        address1: address1.value,
        address2: address2.value,
      },
      phoneNumber: phoneNumber.value,
      order_data: order_data.value,
      price: price.value,
      quantity: quantity.value,
      request: request.value,
    };

    // console.log('data : ', data);
    const res = await Api.post('/api/order', data);

    alert(res.message);
    console.log(res.data);

    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// Orders read

// 유저명을 넣으면 user_id로 변환하는 부분이 필요하다
// 지금은 user_id (예를 들면 628c82fa7f591f48de1d6f74) 를 넣어야 특정 사용자의 주문 조회가 가능하다!
// elice 라는 fullName이 readOrdersName로 입력되면, elice를 628c82fa7f591f48de1d6f74로 바꿔줘야 한다.
// 지금은 backend 단에서 user_id 가 일치하는지 여부를 보고 데이터를 가져오기 때문!
// user_id가 일치하는지 여부를 보고 데이터를 가져오는 방식은 옳다! elice -> 628c82fa7f591f48de1d6f74가 자동으로 되는 부분을 만들어놨는지 여쭤보기

const readOrders = document.querySelector('.o_get');
const readOrdersName = readOrders.querySelector('#name');
const readOrdersBtn = readOrders.querySelector('#btn');

readOrdersBtn.addEventListener('click', async () => {
  const params = readOrdersName.value;
  try {
    console.log('params : ', params);
    let res;
    if (!params) res = await Api.get('/api/order/admin/orderlist', params);
    else res = await Api.get('/api/order/admin', params);

    if (!params && !res) alert('제품이 없습니다.');
    else if (params && !res) alert(`${params} 라는 제품은 없습니다.`);
    else alert('orders read 완료');

    console.log('모든 orders 데이터', res.data);
    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});

// Orders delete (category delete 부분 문제 해결 후 한번에 같이 해결하기)

// category delete 하는 back 부분(범석님이 구현),
// order delete 하는 back 부분(은지님이 구현),
// 그리고 frontEnd api.js 쪽에서 delete 하는 부분 (del 함수)
// 이 셋의 형식이 일치해야 한다!

// 주문은 추가, 조회, 취소만 하면 된다!

// ==================== <Product> ====================

// Product create (insert)
// => 입력값 모두 넣고 submit 누르면 api.js 35번쨰 줄에서 500 Error 발생했다는 콘솔 메세지!
// 입력 데이터 형식이 잘못된 것인가...? 내일 여쭤보기

const insertProduct = document.querySelector('.p_insert');
const categoryName = insertProduct.querySelector('#categoryName');
const name = insertProduct.querySelector('#name');
const Productprice = insertProduct.querySelector('#price');
const imgUrl = insertProduct.querySelector('#imgUrl');
const information = insertProduct.querySelector('#information');
const author = insertProduct.querySelector('#author');
const publisher = insertProduct.querySelector('#publisher');
const publishedDate = insertProduct.querySelector('#publishedDate');
const orderCount = insertProduct.querySelector('#orderCount');
const insertProductBtn = insertProduct.querySelector('#btn');

insertProductBtn.addEventListener('click', async () => {
  try {
    const data = {
      categoryName: categoryName.value,
      name: name.value,
      price: Productprice.value,
      imgUrl: imgUrl.value,
      information: information.value,
      author: author.value,
      publisher: publisher.value,
      publishedDate: publishedDate.value,
      orderCount: orderCount.value,
    };

    // console.log('data : ', data);
    const res = await Api.post('/api/product', data);

    alert(res.message);
    console.log(res);

    // 로그인 페이지 이동
    // window.location.href = '/admin';
  } catch (err) {
    alert(err);
  }
});
