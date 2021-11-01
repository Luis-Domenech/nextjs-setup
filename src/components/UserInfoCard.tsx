import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import { NextPage } from 'next';



const UserInfoCard: NextPage = () => {
  return (
    <Stack align="center" spacing={8}>
      <Flex p={5} shadow="lg" flexDir={["column", "column"]} w={["95%", "100%"]} borderWidth="1px" rounded={4}>
        <Box>
          <Text>Name: Luis Domenech</Text>
        </Box>
      </Flex>
    </Stack>
  );
}

export default UserInfoCard