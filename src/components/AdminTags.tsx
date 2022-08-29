import React from 'react'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

import { RootState } from "../redux/store"
import { useAppDispatch } from "../redux/hooks"
import { deleteCategory } from '../redux/reducers/categoryReducer'

library.add(faTrashCan, faSquarePen)
/**
 * This is a Category single card
 * @deleteCategoryById is delete function for deleteting the category card from store using id
 * @param props.category cantains category information 
 * @returns AdminTags card
 */
export const AdminTags = (props :any) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const deleteCategoryById = (id: number) => {
      dispatch(deleteCategory({ id: id }))
    }
    const image = props.category?.image && JSON.parse(JSON.stringify(props.category.image))
    return (
    <div className="categories-card">
      <div className='categories-card-hid' onClick={(e)=>{  navigate(`/products/${props.category._id}`)}}>
        <img src={ image? image.filelocation: null } 
        alt={'Image category' } />
      </div>
      <div className="categories-content">
        <article>
         
          <h2 className='hide'>{ props.category.name }</h2> 
          <h4 >{ props.category.name }</h4>
        </article>
        <FontAwesomeIcon
          icon={faSquarePen}
          onClick={(e) => {
            e.preventDefault()
            props.setCategoryId(props.category._id)
            document.documentElement.style.setProperty('--dynamic-popup-category',"block");
          }}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={(e) => {
            e.preventDefault()
            deleteCategoryById(props.category._id)
          }}
        />
      </div>
    </div>)
}
