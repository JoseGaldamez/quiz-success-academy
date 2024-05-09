export const getAllQuestions = async () => {
    const response = await fetch(
        "https://success-academy-test-default-rtdb.firebaseio.com/quiz/v1.json"
    );
    const data = await response.json();
    return data;
};
