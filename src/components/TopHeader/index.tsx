import  './style.scss';
import React, { useRef } from 'react';
import { IconButton, InputBase} from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid';

import emumbaLogo from  '../../assets/emumba-logo-full.png';
import LoginButton from '../Login/index.tsx';

export const TopHeader:React.FC<{searchGists: (param) => Promise<void>}> = ({searchGists}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const findGists = () => {
        const searchQuery = inputRef.current.value;
        return searchGists(searchQuery.length ? searchQuery : "");
    }
    return (
        <div className='top-header'>
            <div>
                <img className="logo" src={emumbaLogo} alt="emumba-logo"/>
            </div>
            <div>
                <div className='search-container' onFocus={(e) => e.currentTarget.classList.add('active')} onBlur={(e) => e.currentTarget.classList.remove('active')}>
                    <InputBase
                        sx={{ ml: 1 }}
                        placeholder="Search by ID ..."
                        inputRef={inputRef}
                    />
                    <IconButton type="button"  aria-label="Search Gists" onClick={findGists}>
                        <GridSearchIcon />
                    </IconButton>
                </div>
               <LoginButton /> 
            </div>
        </div>
    );
}
export default TopHeader;