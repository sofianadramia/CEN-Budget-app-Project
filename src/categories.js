export const categories = [
    'Food',
    'Transportation',
    'Housing',
    'Misc',
    'Entertainment',
    'Clothing'
];

export const makeBudgets = () => {
    return categories.map(category => ({
        name: category,
        amount: 0,
    }));
};