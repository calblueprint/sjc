
class ApiConstants {
  get case() {
    return {
      view : (id) => `/api/cases/${id}`,
      create : `/api/cases`
    }
  }
}

const APIConstants = new ApiConstants();