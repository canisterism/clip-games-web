import {
  Button,
  Flex,
  HStack,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex px={{ base: 6 }} py={{ base: 4 }} alignItems={"center"}>
      {/* 左側 */}

      <Text>Logo</Text>
      <Stack direction={"row"} spacing={6} ml={8}>
        {NAV_ITEMS.map((item) => {
          return (
            <Link href={item.href ?? "#"} color={"gray.600"} key={item.label}>
              {item.label}
            </Link>
          );
        })}
      </Stack>

      <Spacer></Spacer>
      {/* 右側 */}
      <HStack spacing={4}>
        <Button color={"grey"}>Sign in</Button>
        <Button
          bg={"pink.400"}
          color={"whiteAlpha.900"}
          display={{ base: "none", md: "inline-flex" }}
        >
          Sign up
        </Button>
      </HStack>
    </Flex>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
