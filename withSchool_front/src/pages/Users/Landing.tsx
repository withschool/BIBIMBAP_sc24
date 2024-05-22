import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { login, getSchoolId, getClassId } from '../../service/auth';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import base64 from "base-64";

const Landing = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Withschool - 학교랑'));
    });

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold uppercase leading-snug text-primary md:text-4xl">학교랑 : 학교와 소통하는 디지털 교육 플랫폼</h1>
                    <p className="text-base font-bold leading-normal text-white-dark">반갑습니다 =)</p>
                    <div className="flex gap-4 mt-14">
                        <a href="/login" className="bg-blue-600 rounded-lg border hover:bg-gray-500 hover:text-white border-white px-6 py-2 text-white">로그인하기</a>
                        <a href="https://forms.gle/oL1D755SgwzCYrQ48" className="block bg-white rounded-lg border hover:text-white hover:bg-gray-500 border-black px-6 py-2 text-black">신청하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
