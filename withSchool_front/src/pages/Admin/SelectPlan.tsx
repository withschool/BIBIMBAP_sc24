import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CodeHighlight from '../../components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconCode from '../../components/Icon/IconCode';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';

const SelectPlan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('SelectPlan'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [yearlyPrice, setYearlyPrice] = useState<any>(false);

    return (
        <div>
            <div className="pt-5 space-y-8">

                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">플랜 변경</h5>

                    </div>

                    <div className="mb-5">
                        <div className="max-w-[320px] md:max-w-[700px] mx-auto dark:text-white-dark">
                            <div className="md:flex space-y-4 md:space-y-0 mt-5 md:mt-16 text-white-dark">
                                <div className="flex-1 p-4 lg:p-9 border ltr:md:border-r-0 rtl:md:border-l-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-r-none rtl:md:rounded-l-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                    <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">소규모 학교</h3>
                                    <p>작은 규모의 학교에게 적절한 가격을 제공하여, 부담없이 이용하실 수 있습니다.</p>
                                    <div className="my-7 p-2.5 text-center text-lg">
                                        <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">300명 이하</strong> / 매달
                                    </div>
                                    <div className="mb-6">
                                        <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">제공하는 기능들</strong>
                                        <ul className="space-y-3">
                                            <li>24시간 온라인 지원 활성화</li>
                                            <li>학교 맞춤형 기능 추가 제공</li>
                                            <li>맞춤형 기능: 미제공</li>
                                        </ul>
                                    </div>
                                    <button type="button" className="btn btn-dark w-full">
                                        플랜 변경하기
                                    </button>
                                </div>
                                <div className="relative flex-1 p-4 pt-14 lg:p-9 border border-white-light dark:border-[#1b2e4b] transition-all duration-300 rounded-t-md">
                                    <div className="absolute top-0 md:-top-[30px] inset-x-0 bg-primary text-white h-10 flex items-center justify-center text-base rounded-t-md">현재 사용중인 플랜</div>
                                    <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">중규모 학교</h3>
                                    <p>중간 규모 학교에게 적합한 플랜으로, 적합한 가격으로 서비스를 이용하실 수 있습니다.</p>
                                    <div className="my-7 p-2.5 text-center text-lg">
                                        <strong className="text-primary text-xl lg:text-4xl">300 ~ 700명</strong> / 매달
                                    </div>
                                    <div className="mb-6">
                                        <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">제공하는 기능들</strong>
                                        <ul className="space-y-3">
                                            <li>24시간 온라인 지원 활성화</li>
                                            <li>학교 맞춤형 기능 추가 제공</li>
                                            <li>맞춤형 기능: 미제공</li>
                                        </ul>
                                    </div>
                                    <button type="button" className="btn btn-primary w-full">
                                        플랜 변경하기
                                    </button>
                                </div>
                                <div className="flex-1 p-4 lg:p-9 border ltr:md:border-l-0 rtl:md:border-r-0 border-white-light dark:border-[#1b2e4b] rounded-md ltr:md:rounded-l-none rtl:md:rounded-r-none transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
                                    <h3 className="text-xl mb-5 font-semibold text-black dark:text-white-light">대규모 학교</h3>
                                    <p>가장 큰 규모의 플랜으로, 인원 수 제한 없이 서비스를 이용하실 수 있습니다.</p>
                                    <div className="my-7 p-2.5 text-center text-lg">
                                        <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">700명 ~ </strong> / 매달
                                    </div>
                                    <div className="mb-6">
                                        <strong className="text-black dark:text-white-light text-[15px]  mb-3 inline-block">제공하는 기능들</strong>
                                        <ul className="space-y-3">
                                            <li>24시간 온라인 지원 활성화</li>
                                            <li>학교 맞춤형 기능 추가 제공</li>
                                            <li>맞춤형 기능: 제공</li>
                                        </ul>
                                    </div>
                                    <button type="button" className="btn btn-dark w-full">
                                        플랜 변경하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default SelectPlan;
