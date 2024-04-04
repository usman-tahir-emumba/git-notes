import  './style.scss';
import React, { useState, createContext, useEffect } from 'react';
import { Container, Grid, CircularProgress, Button, ButtonGroup } from '@mui/material';
import { CiGrid41 } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { HiArrowRight } from "react-icons/hi2";
import axios from 'axios';

import GistGrid from '../GistGrid/index.tsx'; 
import GistList from '../GistList/GistList.tsx'; 
import { TopHeader } from '../TopHeader/index.tsx'
import { getParamFromUrl } from '../../utils/index.js';
import { IGist, IGistContextProps } from '../../interfaces/Gist.ts';


const GistContext = createContext<IGistContextProps>({
  gists: [],
  setGists: () => {},
});

export const LandingPage:React.FC = () => {
  const [gists, setGists] = useState<Array<IGist>>([]);
  const [currentPage, setCurPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const PAGE_SIZE = 9; // 3 rows in grid view 

  useEffect(() => {
    fetchGists();
  }, []);

  const fetchNextPage = () => fetchGists(currentPage + 1);
  const fetchPrevPage = () => fetchGists(currentPage - 1);

  const fetchGists = async (pageNumber = 1, id = '') => {
    setIsLoading(true); // Setting loading state to true on page load
    try {
      const response = await axios.get(`https://api.github.com/gists/${id ? id : 'public'}?per_page=${PAGE_SIZE}&page=${pageNumber}`, {
        headers: {'accept': 'application/vnd.github+json'}
      });
      const linkHeader: string = response.headers.link || '';
      const pagesRemaining = linkHeader && linkHeader.includes(`rel="last"`);
      const pagesRemainingRegex = /(?<=<)([\S]*)(?=>; rel="last")/i;
      if(pagesRemaining){
        const lastPageUrl = linkHeader.match(pagesRemainingRegex)[0];
        const totalPages = getParamFromUrl(lastPageUrl, "page");
        setTotalPages(totalPages ? +totalPages : 0);
      }
      const _response = id ? [response.data]: response.data;
      const payload:Array<IGist> = _response.map(row => ({
        ...row,
        createdAtDate: (new Date(row.created_at)).toLocaleDateString(),
        createdAtTime: (new Date(row.created_at)).toLocaleTimeString(),
        keywords: "Webserver",
        notebook: Object.keys(row.files).pop()
      }));
      setGists(payload);
      setCurPage(pageNumber);
    } catch (error) {
      console.error('Error fetching gists:', error);
      setGists([]);
      // Todo: Handle errors gracefully (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  const toggleViewMode = (event) => {
    event.stopPropagation();
    setViewMode((oldState) => oldState === 'grid' ? 'list': 'grid')
  }
  const findGistById = (gistId) => {
    return fetchGists(1, gistId);
  }

  return (
    <>
    <TopHeader searchGists={findGistById}/>
    <GistContext.Provider value={{ gists, setGists }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} className ="toggle-gists-view-container">
            <div>
              <CiGrid41 className ={`view-grid-icon ${viewMode === 'grid' ? 'active' : ''}`} onClick={toggleViewMode}/>
              <IoIosList className ={`view-list-icon ${viewMode === 'list' ? 'active' : ''}`} onClick={toggleViewMode}/>
            </div>
          </Grid> 
          <Grid item xs={12} marginTop={0} spacing={4}>
            {isLoading ? (
              <CircularProgress color="secondary" />
            ) : (viewMode === 'grid' ? <GistGrid gists={gists} /> : <GistList gists={gists} />
            )}
          </Grid>
          {!isLoading && gists.length && <Grid item xs={12}>
              <Grid container className='pagination-container'>
                <Grid item xs={8} lg={10}>
                  <Button className="next-page-btn" variant='contained' onClick={fetchNextPage} disabled={gists.length <=1 }>Next Page <HiArrowRight className='arrow-icon'/></Button>
                </Grid>
                <Grid item xs={4} lg={2} className='pagination-details'>
                  <span>
                    {`Page ${currentPage} of ${totalPages}`}
                  </span>
                  <ButtonGroup variant='contained'>
                    <Button onClick={fetchPrevPage} disabled={currentPage <= 1}>{"<"}</Button>
                    <Button onClick={fetchNextPage} disabled={(totalPages && (currentPage >= +totalPages)) || (gists.length <=1)}>{">"}</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
          </Grid>}
        </Grid>
      </Container>
    </GistContext.Provider>
    </>
  );
};

export default LandingPage;
