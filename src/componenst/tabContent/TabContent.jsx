import React, { useContext } from 'react'
import { TodoContext } from '../../context/context'
import './TabContent.css'
export default function TabContent() {
    let {renderCompletedTask,renderActiveTask,renderAllTask,headlerDeleteAll} = useContext(TodoContext)
    return (
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>{renderAllTask()}</div>
            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>{renderActiveTask()}</div>
            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>
                {renderCompletedTask()}
                <div className='w-100 d-flex justify-content-end'>
                    <button type="button" 
                    className='delete-all p-1'
                    onClick={() =>headlerDeleteAll()}
                    >delete all</button>
                </div>
            </div>
        </div>
    )
}
