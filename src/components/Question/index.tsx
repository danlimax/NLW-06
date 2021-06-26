import { ReactNode } from 'react';

//instalar no terminal yarn i classname.
import cx from 'classnames'

import './styles.scss';


// ? Opicional no typescript.
type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswerd?: boolean;
    isHighlighted?: boolean;
}




/* export function Question({
    content,
    author
}: QuestionProps)  Desestruturação e pegar apenas as propriedades. */


export function Question({
    content,
    author,
    isAnswerd = false,
    isHighlighted = false,
    children,
}: QuestionProps) {
    return (

        //Controlar algo em JS podemos utilizar { `propriedade` } no react.
        //Com classname podemos evitar o uso de ternários ? : ''
        <div 
        className={cx(
            'question', 
            { answered: isAnswerd },
            { highlighted: isHighlighted && !isAnswerd },

        )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}