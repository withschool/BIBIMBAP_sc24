import{u as X,f as Z,r as l,s as ee,b as a,j as e,k as f,i as g,F as te,L as y}from"./index-e6579e08.js";import{D as ae,r as S}from"./auth-ba940cfd.js";const ie=()=>{const C=X(),P=Z(),[u,I]=l.useState(""),[i,_]=l.useState(""),[d,E]=l.useState(""),[x,D]=l.useState("2000"),[v,F]=l.useState("01"),[N,j]=l.useState("01"),[s,L]=l.useState(""),[p,A]=l.useState(""),[h,B]=l.useState(""),[m,$]=l.useState(""),[M,re]=l.useState(""),[R,w]=l.useState(!0);let Y=localStorage.getItem("certifyinfo");const c=JSON.parse(Y),b=localStorage.getItem("isStudent")==="true";l.useEffect(()=>{C(ee("Withschool-Register-SignIn"))}),l.useEffect(()=>{localStorage.getItem("certifyinfo")},[]);const k=t=>{E(t.target.value)},q=t=>{D(t.target.value)},J=t=>{F(t.target.value)},O=t=>{j(t.target.value)},T=t=>{I(t.target.value)},W=t=>{_(t.target.value),console.log("바뀜"),w(!0)},z=t=>{L(t.target.value)},G=t=>{A(t.target.value)},H=t=>{B(t.target.value)},K=t=>{$(t.target.value)},Q=async t=>{t.preventDefault();try{console.log(c),await ae(i)?alert("중복된 아이디입니다. 다시 설정해주세요."):(alert("사용 가능한 아이디입니다."),w(!1))}catch(r){console.error("오류가 발생했습니다:",r)}},U=t=>{let r=(""+t).replace(/\D/g,"");r.length>11&&(r=r.substring(0,11));let o="";for(let n=0;n<r.length;n++)(n===3||n===7)&&(o+="-"),o+=r[n];return o},V=t=>{const r=/\d+/g,o=t.match(r);return o?o.join(""):""};return a("div",{children:[e("div",{className:"absolute inset-0",children:e("img",{src:"/assets/images/auth/bg-gradient.png",alt:"image",className:"h-full w-full object-cover"})}),a("div",{className:"relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16",children:[e("img",{src:"/assets/images/auth/coming-soon-object1.png",alt:"image",className:"absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"}),e("img",{src:"/assets/images/auth/coming-soon-object2.png",alt:"image",className:"absolute left-24 top-0 h-40 md:left-[30%]"}),e("img",{src:"/assets/images/auth/coming-soon-object3.png",alt:"image",className:"absolute right-0 top-0 h-[300px]"}),e("img",{src:"/assets/images/auth/polygon-object.svg",alt:"image",className:"absolute bottom-0 end-[28%]"}),e("div",{className:"relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]",children:e("div",{className:"relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20",children:a("div",{className:"mx-auto w-full max-w-[440px]",children:[a("div",{className:"mb-10",children:[e("h1",{className:"text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl",children:"회원가입"}),e("p",{className:"text-base font-bold leading-normal text-white-dark",children:"사용할 아이디와 비밀번호를 입력해주세요."})]}),a("form",{className:"space-y-5 dark:text-white",onSubmit:async t=>{t.preventDefault();const r=`${(parseInt(x)%100).toString().padStart(2,"0")}${v}${N}`,o=V(h);try{if(!b&&u===""||d===""||h==="")throw new Error("기입하지 않는 항목이 있습니다. 입력해 주세요.");if(R)throw new Error("아이디 중복 확인 후 시도바랍니다.");if(s.length<6||s!=p)throw new Error("비밀번호가 6자리 미만이거나 일치하지 않습니다.");if(b){const n=localStorage.getItem("userCode")??"";console.log(i,m,s,c.user.userName,d==="male",h,"",c.user.birthDate,-1);const se=await S(i,m,s,c.user.userName,d==="male",o,"",c.user.birthDate,-1,n)}else{console.log(i,m,s,u,d==="male",h,"",r,1);const n=await S(i,m,s,u,d==="male",o,"",r,1,"")}alert("회원가입이 완료되었습니다."),P("/login")}catch(n){alert(n.message)}},children:[e("label",{htmlFor:"Name",children:"Name"}),b?e("div",{children:a("div",{className:"relative text-gray-500 bg-gray-300 rounded-md ps-10 p-2 flex items-center",children:[e("div",{children:c.user.userName}),e("span",{className:"absolute start-3 top-1/2 -translate-y-1/2",children:e(f,{fill:!0})})]})}):e("div",{children:a("div",{className:"relative text-white-dark flex",children:[e("input",{id:"Name",placeholder:"이름을 입력해 주세요.",className:"form-input ps-10 placeholder:text-white-dark",value:u,onChange:T}),e("span",{className:"absolute start-3 top-1/2 -translate-y-1/2",children:e(f,{fill:!0})})]})}),e("label",{htmlFor:"Birth",children:"Birth"}),a("div",{className:"flex relative text-white-dark",children:[e("select",{value:x,onChange:q,className:"block w-1/3 px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500",children:Array.from({length:75},(t,r)=>2024-r).map(t=>a("option",{value:t,children:[t,"년"]},t))}),e("select",{value:v,onChange:J,className:"block w-1/3 px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500",children:Array.from({length:12},(t,r)=>r+1).map(t=>a("option",{value:t.toString().padStart(2,"0"),children:[t,"월"]},t))}),e("select",{value:N,onChange:O,className:"block w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500",children:Array.from({length:31},(t,r)=>r+1).map(t=>a("option",{value:t.toString().padStart(2,"0"),children:[t,"일"]},t))})]}),a("div",{children:[e("label",{htmlFor:"Sex",children:"Sex"}),a("div",{className:"relative text-white-dark",children:[a("label",{children:[e("input",{id:"male",type:"radio",name:"Sex",className:"relative w-6 h-4 rounded border border-gray-400 mr-2",value:"male",onChange:k}),"남자"]}),a("label",{children:[e("input",{id:"female",type:"radio",name:"Sex",className:"relative w-6 h-4 rounded border border-gray-400 mr-2",value:"female",onChange:k}),"여자"]})]})]}),e("hr",{}),a("div",{children:[e("label",{htmlFor:"IndividualCode",children:"ID"}),a("div",{className:"relative text-white-dark flex",children:[e("input",{id:"Id",placeholder:"아이디를 입력해 주세요.",className:"form-input ps-10 placeholder:text-white-dark",value:i,onChange:W}),e("button",{onClick:Q,className:"ml-2 px-6 flex py-2 rounded-md bg-blue-500 text-white font-bold focus:outline-none hover:bg-blue-600",children:"중복 확인"}),e("span",{className:"absolute start-3 top-1/2 -translate-y-1/2",children:e(f,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Password",children:"Password"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Password",type:"password",placeholder:"비밀번호를 입력해 주세요.",className:"form-input ps-10 placeholder:text-white-dark",value:s,onChange:z}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(g,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"CheckPassword",children:"Confirm Password"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"CheckPassword",type:"password",placeholder:"비밀번호를 재입력해 주세요.",className:"form-input ps-10 placeholder:text-white-dark",value:p,onChange:G}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(g,{fill:!0})})]})]}),s?s.length>=6&&p.length>=6?s===p?e("p",{className:"text-xs text-blue-500",children:"비밀번호가 일치합니다."}):e("p",{className:"text-xs text-red-500",children:"비밀번호가 일치하지 않습니다."}):e("p",{className:"text-xs text-red-500",children:"비밀번호는 최소 6자 이상이어야 합니다."}):e(te,{}),a("div",{children:[e("label",{htmlFor:"PhoneNumber",children:"Phone Number"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"PhoneNumber",type:"tel",placeholder:"핸드폰 번호를 입력해 주세요.",value:U(h),className:"form-input ps-10 placeholder:text-white-dark",onChange:H}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(g,{fill:!0})})]})]}),a("div",{children:[e("label",{htmlFor:"Email",children:"Email"}),a("div",{className:"relative text-white-dark",children:[e("input",{id:"Email",type:"email",placeholder:"이메일을 입력해 주세요.",className:"form-input ps-10 placeholder:text-white-dark",value:m,onChange:K}),e("span",{className:"absolute start-4 top-1/2 -translate-y-1/2",children:e(g,{fill:!0})})]})]}),M&&e("div",{className:"text-red-500",children:"회원가입에 실패하였습니다."}),e("button",{type:"submit",className:"btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]",children:"회원가입"})]}),a("div",{className:"relative my-7 text-center md:mb-9",children:[e("span",{className:"absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"}),e("span",{className:"relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light",children:"or"})]}),a("div",{className:"font-semibold text-center dark:text-white mb-2",children:["학교랑 계정이 있으신가요?  ",e(y,{to:"/login",className:"font-bold uppercase text-primary underline transition hover:text-black dark:hover:text-white",children:"로그인 하러 가기"})]}),a("div",{className:"font-semibold text-center dark:text-white",children:["사용자를 변경하고 싶으신가요?  ",e(y,{to:"/register/choose",className:"font-bold uppercase text-primary underline transition hover:text-black dark:hover:text-white",children:"사용자 선택 하러 가기"})]})]})})})]})]})};export{ie as default};