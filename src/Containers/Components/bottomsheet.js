import React from 'react';
import { View , Text, StyleSheet , Dimensions,Animated, ScrollView, FlatList} from 'react-native';

const {width,height} = Dimensions.get('screen');


const ActionSheet = (props) => {

	const [ alignment ] = React.useState(new Animated.Value(0));

	const bringUpActionSheet = () => {
		Animated.timing(alignment, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false
		}).start();
	};

	const hideTheActionSheet = () => {
		Animated.timing(alignment, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false
		}).start();
	};

	const actionSheetInterpolate = alignment.interpolate({
		inputRange: [0, 1],
		outputRange: [-height / 13*3, 0]
	});

	const actionSheetStyle = {
		/* transform: [{
			translateY: actionSheetInterpolate
		}] */
		bottom: actionSheetInterpolate
	}

	const gestureHandler = (e) => {
		if(e.nativeEvent.contentOffset.y > 0){
			bringUpActionSheet();
		}else if(e.nativeEvent.contentOffset.y == 0){
			hideTheActionSheet();
		}
	}
	const data ={'nativeEvent': {'contentOffset':{'y':20}}}
	
	return (
		<Animated.View style={[styles.container,actionSheetStyle]}>
			<View style={{height:30,width:'100%'}}>
				<View style={{borderTopWidth:2,width:40,alignSelf:'center'}}/>
				<FlatList
				style={styles.grabber}
				showsVerticalScrollIndicator={false}
				onScroll={(event) => {
				gestureHandler(event);
			      let currentOffset = event.nativeEvent.contentOffset.y;
			      console.log(currentOffset); // up or down accordingly
			  }}
		        data={[1,1,1,1]}
		        renderItem={() => <Text/>}
		        keyExtractor={item => item.id}
		      />
		      </View>
			
			<Text>Hello this action sheet</Text>
		</Animated.View>
		);
};

const styles = StyleSheet.create({
	container: {
		position:'absolute',
		left:0,
		right:0,
		bottom: 0,
		backgroundColor:'white',
		height: height/2.4,
		borderTopRightRadius: 40,
		borderTopLeftRadius: 40,
		padding:20,
		width: width/1.05,
		marginHorizontal: 10
	},
	grabber: {
		width: '100%',
		height:20,
		borderTopColor:"gray",
		alignSelf:'center'
	}



});

export default ActionSheet;