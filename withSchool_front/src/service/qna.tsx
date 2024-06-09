const url = 'http://223.130.134.181:8080';

export const getQnaList = async (subjectId: string): Promise<any> => {
    try {
      const response = await fetch(`${url}/subjects/questions?subjectId=${subjectId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      return false;
    }
}

export const makeQna = async (questionContent: string, subjectId: string): Promise<any> => {
    try {
      const response = await fetch(`${url}/subjects/questions`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            questionContent,
            subjectId,
        })
      });
  
      if (response.ok) {
        return true;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      return false;
    }
}

export const getQna = async (questionId: string): Promise<any> => {
    try {
      const response = await fetch(`${url}/subjects/questions/${questionId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      if (response.ok) {
        return true;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      return false;
    }
}

export const deleteQna = async (questionId: string): Promise<any> => {
    try {
      const response = await fetch(`${url}/subjects/questions/${questionId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      if (response.ok) {
        return true;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      return false;
    }
}

export const editQna = async (questionId: string, questionContent: string, answerContent: string): Promise<any> => {
    try {
      const response = await fetch(`${url}/subjects/questions/${questionId}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            questionContent,
            answerContent,
        })
      });
  
      if (response.ok) {
        return true;
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (errorss) {
      return false;
    }
}