import { Developerstable } from "../components/Developertable";
import { Modaladd } from "../components/Modaladd";
import { Modalfilter } from "../components/Modalfilter";
import React, { useEffect, useState } from "react";
import { DeveloperType, ResponseBody } from "../@type/developers/developer.type";
import { IsSignedStatus, RequestStatus } from "../@type/enums/enums";
import { fetchAllDevelopers, fetchFilterDevelopers, fetchPagesWithPageNumber } from "../services/developers.services";
import { auth } from "../services/firebase";
import { useAuth } from "../hooks/auth/useAuth";
import { Toaster } from "react-hot-toast";
import { useTextGlobals } from "../hooks/i18n/useTextGlobals";
import {useNavigate} from "react-router-dom";
import {CircularProgress, Pagination} from "@mui/material";


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '& > * + *': {
//         marginTop: theme.spacing(2),
//       }
//     }
//   })
// )

export function Home() {
  const {texts} = useTextGlobals(process.env.REACT_APP_TEXT_LOCALE)
  const navigate = useNavigate();
  const authLogin = useAuth();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.SUCCESS);
  const [developersList, setDevelopersList] = useState<Array<DeveloperType>>([]);
  const [responseBody, setResponseBody] = useState<ResponseBody>();
  const [query, setQuery] = useState<DeveloperType>();
  const [totalPage, setTotalPage] = useState<number>(0)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        authLogin.isSigned = IsSignedStatus.FALSE
        navigate('/')
      }
    })

    switch (requestStatus) {
      case RequestStatus.SUCCESS:
        if (query) {
          fetchFilterDevelopers(query)
            .then((result) => {
              setDevelopersList(result.body.data)
              setResponseBody(result.body)
              setTotalPage(result.body.total)
            })
            .finally(() => {
              setRequestStatus(RequestStatus.INITIAL_VALUE)
            })
        }

        fetchAllDevelopers()
          .then((result) => {
            if (result.body) {
              setDevelopersList(result.body.data)
              setResponseBody(result.body)
              setTotalPage(result.body.total)
            }
          })
          .finally(() => setRequestStatus(RequestStatus.INITIAL_VALUE));
        break
    }
    return () => {
      unsubscribe();
    }

  }, [authLogin, query, requestStatus, totalPage, navigate])

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchPagesWithPageNumber(page)
      .then((result) => setDevelopersList(result.body.data))
  };

  function handlePaginator() {
    if (developersList && responseBody) {
      const {last_page} = responseBody;

      if (totalPage < 30) {
        return
      } else {
        return (
          <div>
            <Pagination count={last_page} onChange={handleChange}/>
          </div>
        )
      }
    }
  }

  const spinner = (
    <div className='custom-container-spinner'>
      <div className="d-flex justify-content-center text-primary">
        <CircularProgress/>
      </div>
    </div>
  )

  const buttonResetFilter = (
    <button
      onClick={() => {
        setRequestStatus(RequestStatus.SUCCESS)
        setQuery(undefined)
      }}
      type="button"
      className="btn btn-outline-danger mx-3">
      <i className='bi-x-circle me-1'/>
      {texts.HOME_BTN_CLEAR_FILTER}
    </button>
  )

  const content = (
    <div className='container-fluid'
         data-backdrop="static">
      <div className='row mt-lg-5 mb-3 justify-content-md-end'>
        <div className='col-md-auto mx-5'>
          {query ? buttonResetFilter : ''}
          <button
            type="button"
            className="btn btn-outline-primary mx-3"
            data-bs-toggle="modal"
            data-bs-target="#filter-developer-modal">
            <i className='bi-funnel me-1'/>
            {texts.HOME_BTN_FILTER}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add-developer-modal">
            <i className='bi-person-plus-fill me-2'/>
            {texts.HOME_BTN_ADD}
          </button>
        </div>
      </div>
      <div className='row'>
        <div className="col">
          {/*table*/}
          <Developerstable
            onRequestStatus={setRequestStatus}
            developersList={developersList}
            modalUpdateId={'modal-update-developer'}
            modalDeleteId={'modal-delete-developer'}
          />
        </div>
      </div>
      {/*modal add developer*/}
      <Modaladd modalId={'add-developer-modal'} onRequestStatus={setRequestStatus}/>
      {/*modal filter in developer list*/}
      <Modalfilter
        modalId={'filter-developer-modal'}
        onRequestStatus={setRequestStatus}
        setQuery={setQuery}
        setTotalPage={setTotalPage}
        setDeveloperList={setDevelopersList}/>
      <div className='row justify-content-md-center mt-3'>
        <div className='col-md-auto'>
          {totalPage < 30 ? '' : handlePaginator()}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Toaster/>
      {developersList.length > 0 ? content : spinner}
    </>
  )
}
