import React from "react";
import { Text } from "react-native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Button from "./Button";
import CenterView from "./CenterView";
import Welcome from "./Welcome";

import ConversBanner from "../../App/components/ConversationBanner";
import DraggableMarker from "../../App/components/DraggableMarker";
import HeaderNavigation from "../../App/components/HeaderNavigationBar";
import HomePost from "../../App/components/HomePostComponent";
import MessageComponent from "../../App/components/MessageComponents";
import ModalHeader from "../../App/components/ModalHeaderNavigationBar";
import NotificationBanner from "../../App/components/NotificationBanner";
import Rating from "../../App/components/Rating";
import SearchandFix from "../../App/components/SearchAndFixLocation";
import SuggestionCard from "../../App/components/SuggestionsCardView";

storiesOf("ConversBanner", module).add("to Storybook", () => <ConversBanner />);

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

storiesOf("Button", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("with text", () => (
    <Button onPress={action("clicked-text")}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add("with some emoji", () => (
    <Button onPress={action("clicked-emoji")}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));
