import { QUIZ_CATEGORIES } from '../data/quizCatalog';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export const getCategoryWiseQuize = async () => {
    return QUIZ_CATEGORIES.map((category) => {
        const questions = QUIZ_QUESTIONS.filter((question) => question.category === category.title);
        return {
            category: category.title,
            sub_total: category.subcategories.length,
            quiz_total: questions.length,
        };
    });
};

export const getQuizeSubCategory = async (category) => {
    const selectedCategory = QUIZ_CATEGORIES.find((item) => item.title === category);
    if (!selectedCategory) return [];
    return selectedCategory.subcategories.map((subCategory) => ({
        sub_category: subCategory,
        quiz_total: QUIZ_QUESTIONS.filter(
            (question) => question.category === category && question.sub_category === subCategory
        ).length,
    }));
};

export const getQuizeData = async (type, data, category) => {
    const questions = QUIZ_QUESTIONS.filter((question) => {
        if (type === 'category') return question.category === data;
        return question.sub_category === data && (!category || question.category === category);
    });
    return questions.map((question) => {
        const options = [
            question.option_a,
            question.option_b,
            question.option_c,
            question.option_d,
        ];
        for (let index = options.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [options[index], options[randomIndex]] = [options[randomIndex], options[index]];
        }
        return {
            ...question,
            option_a: options[0],
            option_b: options[1],
            option_c: options[2],
            option_d: options[3],
        };
    });
};
