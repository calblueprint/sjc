class LinkConstant {
  get client() {
    return {
      view: (id) => `/clients/${id}`,
    }
  }
}

const LinkConstants = new LinkConstant();