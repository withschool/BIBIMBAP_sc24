const url = 'http://223.130.134.181:8080';

interface Question {
    subjectQuestionPostId: number;
    questionContent: string;
    answerContent: string;
    isAnswered: number;
    subjectId: number;
    questioner: {
        userId: number;
        userName: string;
        name: string;
    };
    answerer: {
        userId: number;
        userName: string;
        name: string;
    };
}

export const getQuestionsBySubject = async (): Promise<Question[] | undefined> => {
    const subjectId = localStorage.getItem('targetSubject');
    if (!subjectId) {
        console.error('Subject ID is not available in local storage');
        return;
    }

    try {
        console.log(`이거다. ${subjectId}`);
        const response = await fetch(`${url}/subjects/questions?subjectId=${subjectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            console.log('Q&A list fetched successfully');
            const data: Question[] = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch Q&A list:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to fetch Q&A list:', error);
    }
}

interface NewQuestion {
    questionContent: string;
    subjectId: number;
}
export const createQuestion = async (questionContent: string): Promise<Question | undefined> => {
    const subjectId = localStorage.getItem('targetSubject');
    if (!subjectId) {
        console.error('Subject ID is not available in local storage');
        return;
    }

    const newQuestion: NewQuestion = {
        questionContent,
        subjectId: Number(subjectId),
    };

    try {
        const response = await fetch(`${url}/subjects/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newQuestion)
        });

        if (response.ok) {
            console.log('Question created successfully');
            const data: Question = await response.json();
            return data;
        } else {
            const errorMessage = await response.text();
            console.error('Failed to create question:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Failed to create question:', error);
    }
}