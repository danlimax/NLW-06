import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};
// Nomear propriedades através do typescript.

/* type ButtonProps = {
    text?: string        //children?
} */


//? = OPCIONAL

export function Button({ isOutlined = false, ...props }: ButtonProps) {
return (
    <button 
    className={`button ${isOutlined ? 'outlined': ''}`}
    {...props} />
)
}

// Colocar {} dentro do html para colocar javascript.

// Propriedade children é a unica que não pode ser nomeada no react.

// Imutabilidade significa que a partir do momento que uma variável foi criada dentro de um estado de um componente ela não sofre alterações.
