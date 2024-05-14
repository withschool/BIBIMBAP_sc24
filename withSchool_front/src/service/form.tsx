const url = 'http://223.130.134.181:8080';

interface TeacherNotice {
    title: string;
    content: string;
  }

export const teacherNotice = async (title: string, content: string): Promise<any> => {
    try {
      const body: TeacherNotice = {
        title,
        content
      };
      const response = await fetch(`${url}/admin/schools/notices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('공지 작성 완료:', data);
        return data;
      } else {
        const errorMessage = await response.text();
        console.error('공지 작성 실패:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      console.error('공지 실패했어요:', errorss);
    }
  }