export interface IRegisterForm{
    name:"username"|"email"|"password";
    type:string;
    placeholder:string;
    validation:{
        required?:boolean,
        pattern?:RegExp,
        minLength?:number,
        maxLength?:number
    }
}
export interface ILoginForm{
    name:"identifier"|"password";
    type:string;
    placeholder:string;
    validation:{
        required?:boolean,
        pattern?:RegExp,
        minLength?:number,
        maxLength?:number
    }
}

export interface IErrorResponse {
    error: {
      message: string;
    };
}

// export interface ITodo {
//     id: number;
//     title: string;
//     description: string;
//   }
  