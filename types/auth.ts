 interface User {
  id: string
  email: string
  // add more fields if needed
}

 interface RegisterFormData {
  email: string
  password: string
  name: string
}
 interface LoginFormData {
  email: string
  password: string
}

 interface AuthCredentials {
  email: string
  password: string
}
export type { User, RegisterFormData ,AuthCredentials,LoginFormData}