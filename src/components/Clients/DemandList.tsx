// import React, {useState} from 'react'
// import {View,Text,Button, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
// import colors from '../../../assets/constants/colors'
// import GlobalStyles from '../../../assets/constants/GlobalStyles'
// import IDemand from '../../../assets/models/Demand'

// let wants=[
//     { curriculum: 'Cloud/Native', needBy:'08/21/21', howMany:'20',client:"webstuff", key:'1'},
//     { curriculum: 'React/Node', needBy:'09/11/21', howMany:'7',client:"infome", key:'2'},
//     { curriculum: 'HTML/CSS', needBy:'11/17/21', howMany:'15', client:"cogwheel",key:'3'},
//     { curriculum: 'AWS Pipeline', needBy:'10/31/21', howMany:'17',client:"revaturejr", key:'4'},
//     { curriculum: 'Dev/Ops', needBy:'1/17/22', howMany:'31',client:"noaws", key:'5'},
//     { curriculum: 'JAVA/.Net', needBy:'7/20/22', howMany:'211',client:"revaturejr", key:'6'},
    
// ]
// let clientArray:IDemand[] = [];
   


// const DemandList=(props:any)=>{

//     const[currDemand, setDemand]=useState<IDemand[]>();
        
//     for(let x=0;x<wants.length;x++){
//         if (wants[x].client===props.currClient)
//         {

//             clientArray.push(wants[x])
//         }
//     }
//     if (clientArray.length!==0)
   
//     {

//             return(
//                 <View>
//                     <FlatList
//                          data={wants
//                             .filter(
//                                 (wants)=>
//                                 wants.client
//                                  .includes(props.currClient)
                            


//                     )}
//                     renderItem={({item})=>(
//                         <View style={styles.listItem}>
//                             <Text >{item.curriculum}  {item.needBy}  {item.howMany}</Text>
//                            <TouchableOpacity onPress={()=>console.log(item)}>
//                                <Text style={GlobalStyles.button}>Delete</Text>
//                            </TouchableOpacity>
//                         </View>
//                         )}
//                     />
//                 </View>
//             )
//         }
    
//     return(<></>)

// }
// const styles=StyleSheet.create({
    
//     item:{
//         flexDirection:"row",
//         justifyContent:"space-evenly",      
//         alignItems:"center",
//         margin:5,
//         padding:5,
//     },
//     listItem:{
//         flexDirection:"row",
//         alignItems:"center",
//         justifyContent: 'space-between',
//         padding: 20,
//         paddingLeft: 10,
//         margin: 10,       
//         shadowColor:colors.primaryGray,
//         shadowOffset: 
//             {
//           width: 0,
//           height: 2,
//             },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//         borderRadius: 35,
//         backgroundColor:colors.secondaryBlue,
        
//     },    



// })
// export default DemandList

import React , {useState} from 'react'
import {View,Text,Button, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import colors from '../../../assets/constants/colors'
import GlobalStyles from '../../../assets/constants/GlobalStyles'
import IDemand from '../../../assets/models/Demand'

let wants=[
    { curriculum: 'Cloud/Native', needBy:'08/21/21', howMany:'20',client:"webstuff", key:'1'},
    { curriculum: 'React/Node', needBy:'09/11/21', howMany:'7',client:"infome", key:'2'},
    { curriculum: 'HTML/CSS', needBy:'11/17/21', howMany:'15', client:"cogwheel",key:'3'},
    { curriculum: 'AWS Pipeline', needBy:'10/31/21', howMany:'17',client:"revaturejr", key:'4'},
    { curriculum: 'Dev/Ops', needBy:'1/17/22', howMany:'31',client:"noaws", key:'5'},
    { curriculum: 'JAVA/.Net', needBy:'7/20/22', howMany:'211',client:"revaturejr", key:'6'},

]
let clientArray:IDemand[] = [];



const DemandList=(props:any)=>{

    const[currDemand, setDemand]=useState<IDemand[]>();

    for(let x=0;x<wants.length;x++){
        if (wants[x].client===props.currClient)
        {

            clientArray.push(wants[x])
        }
    }
    if (clientArray.length!==0)

    {

            return(
                <View>
                    <FlatList
                         data={wants
                            .filter(
                                (wants)=>
                                wants.client
                                 .includes(props.currClient)



                    )}
                    renderItem={({item})=>(
                        <View style={styles.item}>
                            <Text style={GlobalStyles.listItem}>{item.curriculum}  {item.needBy}  {item.howMany}</Text>
                           <TouchableOpacity onPress={()=>console.log(item)}>
                               <Text style={GlobalStyles.button}>X</Text>
                           </TouchableOpacity>
                        </View>
                        )}
                    />
                </View>
            )
        }

    return(<></>)

}
const styles=StyleSheet.create({
    listItem:{

        borderColor:colors.primaryGray,
        borderRadius:50,
        marginHorizontal:10,

    },
    item:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    }
})
export default DemandList