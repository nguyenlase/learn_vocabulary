import { useForm } from 'react-hook-form';
import { IInput } from '../../models/others';

const InputForm: React.FC<IInput> = ({
    type,
    placeholder,
    id,
    registerName,
    functionHandler,
    nameLabel,
    value,
}) => {
    const {
        register,
        formState: { errors },
    } = useForm({});

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="font-bold mb-2 ">
                {nameLabel}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                className="rounded-md p-[5px] transition-all focus:border-blue-500  border-2 border-gray-400 w-full outline-none mb-4 "
                {...register(registerName, {
                    onChange: (e) => {
                        functionHandler(e.target.value);
                    },
                })}
                value={value}
            />
        </div>
    );
};

export default InputForm;