import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, icons, images, SIZES, theme } from "../../constants";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [area, setArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        let areaData = data.map((item) => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://www.countryflagsapi.com/png/${item.alpha2Code}`,
          };
        });

        setArea(areaData);

        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code == "US");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
  }, []);

  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: SIZES.padding * 2,
          marginTop: SIZES.padding * 3,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => console.log("Sign Up")}
      >
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: COLORS.white }}
        />
        <Text
          style={{
            marginLeft: SIZES.padding * 1,
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  };

  const renderLogo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.wallieLogo}
          resizeMode="contain"
          style={{ width: "60%" }}
        />
      </View>
    );
  };

  const renderForm = () => {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 3,
          marginTop: SIZES.padding * 3,
        }}
      >
        {/* FullName */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            FullName
          </Text>
          <TextInput
            style={{
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              ...FONTS.body3,
              marginVertical: SIZES.padding,
              color: COLORS.white,
              height: 40,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>

        {/* Phone Number */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Phone Number
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                width: 100,
                height: 40,
                flexDirection: "row",
                ...FONTS.body3,
              }}
              onPress={() => setModalVisible(true)}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={icons.down}
                  style={{ width: 10, height: 10, tintColor: COLORS.white }}
                />
              </View>
              <View
                style={{ justifyContent: "center", marginLeft: SIZES.padding }}
              >
                <Image
                  source={{ uri: selectedArea?.flag }}
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View
                style={{ justifyContent: "center", marginLeft: SIZES.padding }}
              >
                <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                  {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={{
                borderBottomColor: COLORS.white,
                marginLeft: 5,
                flex: 1,
                borderBottomWidth: 1,
                ...FONTS.body3,
                marginVertical: SIZES.padding,
                color: COLORS.white,
                height: 40,
              }}
              selectionColor={COLORS.white}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Password
          </Text>
          <TextInput
            style={{
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              ...FONTS.body3,
              marginVertical: SIZES.padding,
              color: COLORS.white,
              height: 40,
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              bottom: 10,
              width: 30,
              height: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.disable_eye : icons.eye}
              style={{ width: 20, height: 20, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 3,
          marginTop: SIZES.padding * 3,
        }}
      >
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderAreaCode = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ justifyContent: "center", padding: SIZES.padding }}>
            <Image
              source={{ uri: item?.flag }}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          </View>
          <View style={{ justifyContent: "center", marginLeft: SIZES.padding }}>
            <Text style={{ color: COLORS.black, ...FONTS.body4 }}>
              {item?.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 400,
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
                width: SIZES.width * 0.8,
              }}
            >
              <FlatList
                data={area}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCode()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
