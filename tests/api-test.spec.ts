import { test, expect } from '@playwright/test';

test('GET users/list', async ({ request }) => {

  const response = await request.get('api/users?page=2')

  expect(response.status()).toBe(200)

  const userNames = ['Michael', 'Lindsay', 'Tobias', 'Byron', 'George','Rachel'];
  const text = await response.text()
  userNames.forEach(str => {
    expect(text).toContain(str);
  });
});

test('GET single user', async ({ request }) => {

  const response = await request.get('api/users/2')

  expect(response.status()).toBe(200)

  const userName = 'Janet'
  const text = await response.text()
  expect(text).toContain(userName)
});

test('GET single use not found 404', async ({ request }) => {

  const response = await request.get('api/users/23')

  expect(response.status()).toBe(404)

  const responseBody = await response.json();
  expect(responseBody).toEqual({});
});

test('POST login successful', async ({ request }) => {

  const response = await request.post('api/login',{
    data: {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }
  })

  expect(response.status()).toBe(200)

  const responseBody = await response.json();
  expect(responseBody).toEqual({"token": "QpwL5tke4Pnpja7X4"});
});

test('POST login unsuccesful missing password', async ({ request }) => {

  const response = await request.post('api/login',{
    data: {
      "email": "eve.holt@reqres.in",
    }
  })

  expect(response.status()).toBe(400)

  const responseBody = await response.json();
  expect(responseBody).toEqual({"error": "Missing password"});
});

test('POST login unsuccesful missing email', async ({ request }) => {

  const response = await request.post('api/login',{
    data: {
      "password": "cityslicka"
    }
  })

  expect(response.status()).toBe(400)

  const responseBody = await response.json();
  expect(responseBody).toEqual({"error": "Missing email or username"});
});

test('POST users', async ({ request }) => {

  const response = await request.post('api/users', {
    data: {
      "name": "morpheus",
      "job": "leader"
    }
  })
  expect(response.status()).toBe(201)
});