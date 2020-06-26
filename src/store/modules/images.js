import axios from "axios";
import router from "@/router";

const state = {
  images: [],
};

const getters = {
  allImages: (state) => state.images,
};

const mutations = {
  setImages: (state, images) => (state.images = images),
};

const actions = {
  //이 함수는 비동기 동작을 포함하고 있음
  async fetchImages({ rootState, commit }) {
    const fullUrl = "https://api.imgur.com/3/account/me/images";
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`,
      },
    };
    try {
      //바로 여기가 비동기 파트이다. 기다려!
      const res = await axios.get(fullUrl, config);
      commit("setImages", res.data.data);
    } catch (err) {
      console.error(err.respose);
    }
  },
  uploadImages({ rootState }, event) {
    const fullUrl = "https://api.imgur.com/3/image";
    const images = event.target.files;
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`,
      },
    };

    const promises = [];

    images.forEach((image) => {
      const formData = new FormData();
      formData.append("image", image);
      const promise = axios.post(fullUrl, formData, config);
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => router.push({ name: "ImageList" }))
      .catch((err) => console.error(err));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

//post 는 data를 보내겠다. 받아라!!
//get은 그냥 달라고 하는거
