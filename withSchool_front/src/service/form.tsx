const url = 'http://223.130.134.181:8080';

interface TeacherNotice {
  title: string;
  content: string;
}

export const adminNotice = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch(`${url}/admin/schools/notices`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData,
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
};


export const teacherNotice = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch(`${url}/classes/notices`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('교사 공지 작성 완료:', data);
      return data;
    } else {
      const errorMessage = await response.text();
      console.error('교사 공지 작성 실패:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (errorss) {
    console.error('교사 공지 실패했어요:', errorss);
  }
};