import axios from 'axios';

const instance = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

const Api = {
  assets: {
    create(data) {
      return instance.post('/api/assets', data);
    },
    upload(url, headers, file) {
      return instance.put(url, file, { headers });
    },
  },
  auth: {
    login(email, password) {
      return instance.post('/api/auth/login', { email, password });
    },
    logout() {
      return instance.get('/api/auth/logout');
    },
    register(data) {
      return instance.post('/api/auth/register', data);
    },
  },
  passwords: {
    reset(email) {
      return instance.post('/api/passwords', { email });
    },
    get(token) {
      return instance.get(`/api/passwords/${token}`);
    },
    update(token, password) {
      return instance.patch(`/api/passwords/${token}`, { password });
    },
  },
  resources: {
    index(categoryId) {
      const options = {};
      if (categoryId) {
        options.params = { categoryId };
      }
      return instance.get('/api/resources', options);
    },
    create(data) {
      return instance.post('/api/resources', data);
    },
    get(id) {
      return instance.get(`/api/resources/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/resources/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/resources/${id}`);
    },
  },
  forms: {
    index() {
      return instance.get('/api/forms');
    },
    create(data) {
      return instance.post('/api/forms', data);
    },
    get(id) {
      return instance.get(`/api/forms/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/forms/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/forms/${id}`);
    },
  },
  questions: {
    index(questionnaireId) {
      const options = {};
      if (questionnaireId) {
        options.params = { questionnaireId };
      }
      return instance.get('/api/questions', options);
    },
    create(data) {
      return instance.post('/api/questions', data);
    },
    get(id) {
      return instance.get(`/api/questions/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/questions/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/questions/${id}`);
    },
  },
  questionnaires: {
    index() {
      return instance.get('/api/questionnaires');
    },
    create(data) {
      return instance.post('/api/questionnaires', data);
    },
    get(id) {
      return instance.get(`/api/questionnaires/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/questionnaires/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/questionnaires/${id}`);
    },
  },
  categories: {
    index() {
      return instance.get('/api/categories');
    },
    create(data) {
      return instance.post('/api/categories', data);
    },
    get(id) {
      return instance.get(`/api/categories/${id}`);
    },
    getSlug(slug){
        return instance.get(`api/categories/${slug}`);
    },
    update(id, data) {
      return instance.patch(`/api/categories/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/categories/${id}`);
    },
  },
  answers: {
    index() {
      return instance.get('/api/answers');
    },
    create(data) {
      return instance.post('/api/answers', data);
    },
    get(id) {
      return instance.get(`/api/answers/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/answers/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/answers/${id}`);
    },
  },
  users: {
    me() {
      return instance.get('/api/users/me');
    },
    update(id, data) {
      return instance.patch(`/api/users/${id}`, data);
    },
  },
};

export default Api;
