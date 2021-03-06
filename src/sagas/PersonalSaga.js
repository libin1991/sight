import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';

import { fetchAvatar, fetchUploadImages, fetchUploadAvatar, fetchImages, fetchSignOut } from '../servers/personal';

function* fetchAvatarFun(action) {
  let data = yield call(fetchAvatar);
  let images = yield call(fetchImages, action);
  images = JSON.parse(images);
  data.listData = images.srcs;
  data.total = images.total;
  data.count = images.count;
  yield put({
    type: 'PERSONALREDU',
    data,
  });
}

function* fetchUploadImagesFun(action) {
  let data = yield call(fetchUploadImages, action);
  if(data.code === 200) {
    let images = yield call(fetchImages, action);
    images = JSON.parse(images);
    data.listData = images.srcs;
    data.total = images.total;
    data.count = images.count;
    yield put({
      type: 'PERSONALREDU',
      data,
    });
  }
}

function* fetchUploadAvatarFun(action) {
  const data = yield call(fetchUploadAvatar, action);
  yield put({
    type: 'PERSONALREDU',
    data,
  });
}

function* fetchImagesFun(action) {
  let images = yield call(fetchImages, action);
  let data = {};
  images = JSON.parse(images);
  data.listData = images.srcs;
  data.total = images.total;
  data.count = images.count;
  yield put({
    type: 'PERSONALREDU',
    data,
  });
}

function* fetchSignOutFun() {
  let data = yield call(fetchSignOut);
  data = JSON.parse(data);
  yield put({
    type: 'CLEARREDU',
    data,
  });
}

function* personalSaga() {
  yield takeLatest('GETAVATAR_SAGA', fetchAvatarFun);
  yield takeLatest('UPLOADIMAGES_SAGA', fetchUploadImagesFun);
  yield takeLatest('UPLOADAVATAR_SAGA', fetchUploadAvatarFun);
  yield takeLatest('GETIMAGES_SAGA', fetchImagesFun);
  yield takeLatest('SIGNOUT_SAGA', fetchSignOutFun);
}

export default personalSaga;