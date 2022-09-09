import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction } from '../features/transaction/transactionSlice';

export default function Form() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((state) => state.transaction);
    const { editing } = useSelector((state) => state.transaction) || {};

    // listen for edit mode active
    useEffect(() => {
        const { id, name, amount, type } = editing || {};
        if (id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            setEditMode(false);
            reset();
        }
    }, [editing]);

    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    };

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
                name,
                type,
                amount: Number(amount),
            }),
        );
        reset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            changeTransaction({
                id: editing?.id,
                data: {
                    name: name,
                    amount: Number(amount),
                    type: type,
                },
            }),
        );
        setEditMode(false);
        reset();
    };

    const cancelEditMode = () => {
        reset();
        setEditMode(false);
    };

    return (
        <div className="form">
            <h3 className="mb-2">Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="floating_text"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        for="floating_text"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Name
                    </label>
                </div>
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        id="floating_text"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        for="floating_text"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Amount
                    </label>
                </div>
                <div className="flex justify-between item-center border-b-2 mb-2">
                    <div>
                        <h4>Type :</h4>
                    </div>
                    <div class="flex items-center mb-4">
                        <input
                            id="income"
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={(e) => setType('income')}
                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            for="income"
                            class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Income
                        </label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input
                            id="expense"
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={(e) => setType('expense')}
                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            for="expense"
                            class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Expense
                        </label>
                    </div>
                </div>

                <button disabled={isLoading} className="my-btn" type="submit">
                    {editMode ? 'Update Transaction' : 'Add Transaction'}
                </button>

                {!isLoading && isError && <p className="error">There was an error occured</p>}
            </form>

            {editMode && (
                <button className="my-btn cancel_edit" onClick={cancelEditMode}>
                    Cancel Edit
                </button>
            )}
        </div>
    );
}
