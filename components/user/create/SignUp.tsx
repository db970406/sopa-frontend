/**
 * 생성일: 2022.02.08
 * 수정일: 2022.02.17
 */

import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { loginModeState } from '@utils/atoms';
import Form from '@components/form/Form';
import Input from '@components/form/Input';
import FormButton from '@components/form/FormButton';

interface IForm {
    name: string;
    email: string;
    password: string;
    password2: string;
}
interface ICreateUser {
    createUser: {
        ok: boolean;
        error?: string;
    }
}

const CREATE_USER_MUTATION = gql`
    mutation createUser($name:String!,$email:String!,$password:String!){
        createUser(name:$name,email:$email,password:$password){
            ok
            error
        }
    }
`

export default function SignUp() {
    const { register, handleSubmit, watch } = useForm<IForm>();
    const setLoginMode = useSetRecoilState(loginModeState);

    const createUserCompleted = ({ createUser }: ICreateUser) => {
        const { ok, error } = createUser;
        if (!ok) {
            alert(error);
            return;
        };
        setLoginMode(true);
    };
    const [createUserMutation, { loading }] = useMutation(CREATE_USER_MUTATION, {
        onCompleted: createUserCompleted
    });

    const onValid = ({ name, email, password, password2 }: IForm) => {
        if (loading) return;

        if (password !== password2) {
            alert("확인 비밀번호가 일치하지 않습니다.")
            return;
        };
        createUserMutation({
            variables: {
                name,
                email,
                password
            }
        });
    };

    const checkDisabledStatus = loading || !watch("email") || !watch("name") || !watch("password") || !watch("password2")

    return (
        <Form onSubmit={handleSubmit(onValid)}>
            <Input
                register={register("name", {
                    required: true,
                    minLength: {
                        value: 2,
                        message: "이름은 2글자 이상이어야 합니다."
                    }
                })}
                type="name"
                required
            />
            <Input
                register={register("email", {
                    required: true,
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
                        message: "이메일 양식을 지켜주세요."
                    }
                })}
                type="email"
                required
            />
            <Input
                register={register("password", {
                    required: true,
                    minLength: {
                        value: 8,
                        message: "비밀번호는 8자리 이상이어야 합니다."
                    },
                    maxLength: {
                        value: 15,
                        message: "비밀번호는 15자리 이하이어야 합니다."
                    },
                    pattern: {
                        value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                        message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                    }
                })}
                type="password"
                required

            />
            <Input
                register={register("password2", {
                    required: true,
                    minLength: {
                        value: 8,
                        message: "비밀번호는 8자리 이상이어야 합니다."
                    },
                    maxLength: {
                        value: 15,
                        message: "비밀번호는 15자리 이하이어야 합니다."
                    },
                    pattern: {
                        value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g,
                        message: "비밀번호는 영문, 숫자, 특수문자 포함 8~15자리입니다."
                    }
                })}
                type="password2"
                required
            />
            <FormButton
                disabled={checkDisabledStatus}
                loading={loading}
                text='회원가입'
                onClick={() => null}
            />
        </Form>
    )
}