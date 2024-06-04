import { useNavigate } from 'react-router-dom';

const DefaultRouter = () => {

    const accountType = localStorage.getItem('accountType');
    const navigate = useNavigate();

    switch (accountType) {
        case 'ROLE_SUPER': 
            navigate('/super/home');
        case 'ROLE_ADMIN':
            navigate('/admin/home');
        case 'ROLE_TEACHER':
            navigate('/teacher/home');
        case 'ROLE_PARENT':
            navigate('/parent/home');
        case 'ROLE_STUDENT':
            navigate('/student/calendar');
    }

    return(
        <></>
    );
}

export default DefaultRouter;