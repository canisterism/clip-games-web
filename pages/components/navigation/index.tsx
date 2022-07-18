import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        px={{ base: 4 }}
        py={{ base: 2 }}
        align={"center"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            icon={<HamburgerIcon></HamburgerIcon>}
            onClick={onToggle}
            aria-label={"Toggle Navigation"}
          ></IconButton>
        </Flex>

        <Flex flex={{ base: 1, md: "none" }}>
          <Text>Logo</Text>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} flex={"1"}>
          <DesktopNavigation></DesktopNavigation>
        </Flex>

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
      <Collapse in={isOpen}>
        <MobileNavigation></MobileNavigation>
      </Collapse>
    </Box>
  );
};

const MobileNavigation = () => {
  return (
    <Stack p={"4"} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => {
        return (
          <MobileNavigationItem
            key={navItem.label}
            {...navItem}
          ></MobileNavigationItem>
        );
      })}
    </Stack>
  );
};
const MobileNavigationItem = ({ label, href, children }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack onClick={children && onToggle}>
      <Flex
        as={Link}
        href={href ?? "#"}
        py={2}
        key={label}
        align={"center"}
        justify={"space-between"}
        _hover={{ textDecoration: "none", color: linkHoverColor }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            boxSize={6}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
          ></Icon>
        )}
      </Flex>
      <Collapse in={isOpen}>
        <Stack
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          mt={4}
          pl={4}
        >
          {children?.map((subItem) => {
            return (
              <MobileNavigationSubItem
                key={subItem.label}
                {...subItem}
              ></MobileNavigationSubItem>
            );
          })}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNavigationSubItem = ({ label, subLabel, href }: NavItem) => {
  return (
    <NextLink href={href ?? "#"} passHref>
      <Link py={2}>{label}</Link>
    </NextLink>
  );
};

const DesktopNavigation = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4} ml={10}>
      {NAV_ITEMS.map((item) => {
        return (
          <Popover key={item.label} trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                color={linkColor}
                fontSize={"sm"}
                fontWeight={500}
                p="2"
                _hover={{ textDecoration: "none", color: linkHoverColor }}
              >
                {item.label}
              </Link>
            </PopoverTrigger>
            {item.children && (
              <PopoverContent border={0} boxShadow={"xl"} rounded={"xl"}>
                <Stack padding={4}>
                  {item.children.map((subItem) => (
                    <Link
                      key={subItem.label}
                      rounded="md"
                      href={subItem.href ?? "#"}
                      p="2"
                      _hover={{
                        textDecoration: "none",
                        color: linkHoverColor,
                      }}
                    >
                      <Box>
                        {subItem.label}
                        <Text color={"gray.600"} fontSize={"sm"}>
                          {subItem.subLabel}
                        </Text>
                      </Box>
                    </Link>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        );
      })}
    </Stack>
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
