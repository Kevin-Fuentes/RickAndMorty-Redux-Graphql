import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import {connect}from 'react-redux'
import {removeCharacterAction,addToFvoritesAction} from '../../redux/charsDuck'

 function Home({addFavorite,chars,remove}) {


 

    function renderCharacter() {
     let char = chars[0]
        return (
            <Card leftClick={nextCharacter} 
            rightClick={addFav}
            {...char} />
        )
    }

  function nextCharacter(){
      remove()
  }
function addFav(){
    addFavorite()
}


    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}
const mapState = (state) => {
    return {
        chars:state.chars.array
    }
}
export default connect(mapState,{remove :removeCharacterAction,addFavorite:addToFvoritesAction})(Home)