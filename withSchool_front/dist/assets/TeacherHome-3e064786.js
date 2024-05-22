import{r as a,j as e,b as l,F as i,l as b,t as g}from"./index-e6579e08.js";import{T as n}from"./tippy-react.esm-a8453acd.js";import{l as N}from"./parent-a5a27d9a.js";import{b as x,c as v,e as y}from"./school-623913e2.js";import{I as S}from"./IconDownload-24a2816e.js";import{I as w}from"./IconGallery-cd5e369d.js";import{I}from"./IconPrinter-2cc4c5d7.js";import{I as D,a as k}from"./IconZipFile-77aad00d.js";import{I as L}from"./IconTxtFile-700fdc02.js";const H=()=>{a.useState(!1),a.useState("");const[E,d]=a.useState([]),[T,h]=a.useState([]);a.useState("");const[j,m]=a.useState(!1),[s,c]=a.useState(null),[o,p]=a.useState([]);a.useEffect(()=>{(async()=>{try{const r=await N();d(r)}catch(r){console.error("Error fetching student list:",r)}})()},[]),a.useEffect(()=>{(async()=>{try{const r=await x(localStorage.getItem("TargetStudent"));p(r),console.log(r)}catch(r){console.error("Error fetching student data:",r)}})()},[]),a.useEffect(()=>{(async()=>{try{const r=await v(localStorage.getItem("schoolId"));h(r),console.log(r)}catch(r){console.error("Error fetching student data:",r)}})()},[]);const f=async t=>{try{const r=await y(t);c(r),console.log(r),m(!0)}catch(r){console.error("Error fetching notice detail:",r)}};return e("div",{children:e("div",{className:"panel",id:"icon_pills",children:l("div",{className:"mb-5",children:[e("h6",{className:"text-lg font-bold",children:"학교 공지 조회"}),e("div",{className:"active pt-5",children:l("div",{className:"table-responsive mb-10",children:[o.length===0?e("h1",{children:"작성된 공지가 없습니다."}):e(i,{}),s===null&&l("table",{className:"table-hover text-center",children:[e("thead",{children:l("tr",{children:[e("th",{children:"제목"}),e("th",{children:"작성자"}),e("th",{children:"작성일시"}),e("th",{className:"text-center",children:"파일"})]})}),e("tbody",{children:o.slice().reverse().map((t,r,u)=>l("tr",{className:"cursor-pointer",onClick:()=>f(u.length-r),children:[e("td",{children:e("div",{className:"whitespace-nowrap",children:t.title})}),e("td",{children:t.user.name}),l("td",{children:[t.regDate[0],"년 ",t.regDate[1],"월 ",t.regDate[2],"일 ",t.regDate[3],":",String(t.regDate[4]).padStart(2,"0")]}),e("td",{className:"text-center",children:t.filesURL!=null?e(n,{content:"파일 다운로드",children:e("button",{type:"button",children:e(b,{className:"w-5 h-5 ltr:mr-2 rtl:ml-2"})})}):e(i,{})})]},t.id))})]}),s!==null&&l("div",{children:[l("div",{className:"flex items-center justify-between flex-wrap p-4",children:[l("div",{className:"flex items-center",children:[e("button",{type:"button",className:"ltr:mr-2 rtl:ml-2 hover:text-primary",onClick:()=>c(null),children:e(g,{className:"w-5 h-5 rotate-180"})}),e("h4",{className:"text-base md:text-lg font-medium ltr:mr-2 rtl:ml-2",children:s.title}),e("div",{className:"badge bg-info hover:top-0",children:s.type})]}),e("div",{children:e(n,{content:"Print",children:e("button",{type:"button",children:e(I,{})})})})]}),e("div",{className:"h-px border-b border-white-light dark:border-[#1b2e4b]"}),l("div",{className:"p-4 relative",children:[e("div",{className:"flex flex-wrap",children:e("div",{className:"ltr:mr-2 rtl:ml-2 flex-1",children:e("div",{className:"flex items-center justify-end",children:l("div",{className:"text-sm ltr:mr-2 rtl:ml-4 whitespace-nowrap",children:["작성자: ",s.user.name]})})})}),e("div",{className:"text-2xl mb-4",dangerouslySetInnerHTML:{__html:s.content}}),l("p",{children:[s.user.name,"님이 공지함"]}),l("p",{children:[s.regDate[0],"년 ",s.regDate[1],"월 ",s.regDate[2],"일 ",s.regDate[3],"시 ",s.regDate[4],"분 게시됨"]}),Array.isArray(s.filesURL)&&l("div",{className:"mt-8",children:[e("div",{className:"text-base mb-4",children:"Attachments"}),e("div",{className:"h-px border-b border-white-light dark:border-[#1b2e4b]"}),e("div",{className:"flex items-center flex-wrap mt-6",children:s.filesURL.map((t,r)=>l("button",{type:"button",className:"flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-white-light dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group",children:[t.type==="image"&&e(w,{}),t.type==="folder"&&e(D,{}),t.type==="zip"&&e(k,{}),t.type!=="zip"&&t.type!=="image"&&t.type!=="folder"&&e(L,{className:"w-5 h-5"}),l("div",{className:"ltr:ml-3 rtl:mr-3",children:[e("p",{className:"text-xs text-primary font-semibold",children:t.name}),e("p",{className:"text-[11px] text-gray-400 dark:text-gray-600",children:t.size})]}),e("div",{className:"bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block"}),e("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10",children:e(S,{className:"w-4.5 h-4.5"})})]},r))})]})]})]})]})})]})})})};export{H as default};
