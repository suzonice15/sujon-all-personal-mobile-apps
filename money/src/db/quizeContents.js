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

const shuffle = (items) => {
    const list = [...items];
    for (let index = list.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
    }
    return list;
};

const filterQuestions = (type, data, category) => QUIZ_QUESTIONS.filter((question) => {
    if (type === 'category') return question.category === data;
    return question.sub_category === data && (!category || question.category === category);
});

// Study mode: questions in their original order with the correct answer, no shuffling
export const getQuizeStudyData = async (type, data, category) => filterQuestions(type, data, category);

// limit > 0 picks that many random questions (used by the mixed skill test)
export const getQuizeData = async (type, data, category, limit = 0) => {
    let questions = filterQuestions(type, data, category);
    if (limit > 0) questions = shuffle(questions).slice(0, limit);
    return questions.map((question) => {
        const options = shuffle([
            question.option_a,
            question.option_b,
            question.option_c,
            question.option_d,
        ]);
        return {
            ...question,
            option_a: options[0],
            option_b: options[1],
            option_c: options[2],
            option_d: options[3],
        };
    });
};
