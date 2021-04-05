import React,{ Component} from 'react';
import {StyleSheet , View , Text , TextInput, TouchableOpacity} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends Component{
      constructor(){
          super(
              this.state = {
               word : '',
               definition :''
              }
          )
      }
    
    getWord=(word)=>{
            var searchKeyword = word.toLowerCase()
            var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
            //console.log(url)
            return fetch(url)
            .then((data)=>{
                if(data.status===200)
                {
                    return data.json()
                }
                else
                {
                    return null
                }
            })
            .then((response)=>{
                //console.log(response)
                var responseObject = response
                //var word = responseObject.result[0].lexicalEntries[0].lexicalCategory.text
                if(responseObject)
                {
                    var wordData = responseObject.defenitions[0]
                    //console.log(responseObject.defenitions[0])
                   var definition = wordData.description
                   var lexicalCategory = wordData.wordtype
                   //console.log(lexicalCategory)
                   this.setState({
                       "word" : word ,
                       "definition" : definition,
                       "lexicalCategory" : lexicalCategory
                   })
                }
                else
                {
                    this.setState({
                        "word" : this.state.text,
                        "definition" : "Not Found"
                    })
                }
            })
        }
    render(){
        return(

            <View>
              <TextInput
              style = {styles.inputBox}
              onChangeText = {text => {
                  this.setState({
                      text:text,
                      isSearchPressed: false,
                      word : "Loading...",
                      lexicalCategory:"",
                      examples : [],
                      defination : ""
                  });
                }}
                value = {this.state.text}
                />

             <TouchableOpacity
             style = {styles.searchButton}
             onPress={()=>{
                 this.setState({ isSearchPressed:true})
                 this.getWord(this.state.text)
             }}>
             </TouchableOpacity>

<View style = {styles.detailsContainer}>
<Text style = {styles.detailsTitle}>
Word :{" "}
</Text>
<Text style = {{fontSize:18}}>
{this.state.word}
</Text>
</View>

<View style = {styles.detailsContainer}>
    <Text style = {styles.detailsTitle}>
        Type:{""}
    </Text>
    <Text style = {{fontSize:18}}>
        {this.state.lexicalCategory}
    </Text>
</View>

<View style = {{flexDirection : 'row',flexWrap:'wrap'}}>
    <Text style = {styles.detailsTitle}>
        Definition :{" "}
    </Text>
    <Text style = {{fontSize:18}}>
        {this.state.definition}
    </Text>
</View>
<View style = {styles.outputContainer}>
    <Text style = {{fontSize:20}}>
        {
            this.state.isSearchPressed && this.state.word === 'Loading'
            ?rthis.state.word
            :''
        }
    </Text>
    {
        this.state.word!== "Loading..."?
        (
            <View style = {{justifyContent : 'center',marginLeft :10}}>

            </View>
        )
    
        </View>    
        </View>
        )
    }
}

const styles = StyleSheet.create({
container :{
    flex : 1
},
inputBoxContainer : {
    flex : 0.3,
    alignItems : 'center',
    justifyContent : 'center'
},
inputBox : {
    width : '80%',
    alignSelf : 'center',
    height : 40
}
})
