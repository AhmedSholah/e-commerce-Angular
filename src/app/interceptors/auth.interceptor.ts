import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem("authToken"); 
  if(authToken){
    const cloneRequest = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(cloneRequest);
  }
  return next(req);
};
