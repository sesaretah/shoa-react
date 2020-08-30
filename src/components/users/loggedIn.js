
export function loggedIn() {
    var token = window.localStorage.getItem('token');
    if (token) {
      return true
    } else {
      window.localStorage.setItem('url', window.location.href);
      this.$f7router.navigate('/login/');
      
    }

}
