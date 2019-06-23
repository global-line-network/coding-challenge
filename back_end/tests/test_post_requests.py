import requests
from . import utils


def test_create():
    conf = utils.get_test_config()
    payload = {
        "name": "morpheus",
        "job": "leader"
    }
    url = conf['host'] + conf['urls']['users']
    response = requests.post(url, payload)
    create_data = response.json()
    assert create_data['name'] == 'morpheus'
    assert create_data['job'] == 'leader'
    assert response.status_code == 201


def test_update():
    conf = utils.get_test_config()
    payload = {
        "name": "morpheus",
        "job": "zion resident"
    }
    url = conf['host'] + conf['urls']['users'] + '/1'
    response = requests.post(url, payload)
    create_data = response.json()
    assert create_data['name'] == 'morpheus'
    assert create_data['job'] == 'zion resident'
    assert response.status_code == 201

    payload = {
        "name": "morpheus",
    }
    url = conf['host'] + conf['urls']['users'] + '/1'
    response = requests.post(url, payload)
    create_data = response.json()
    assert create_data['name'] == 'morpheus'
    assert 'job' not in create_data
    assert response.status_code == 201


def test_register():
    conf = utils.get_test_config()
    payload = {
        "email": "eve.holt@reqres.in",
        "password": "pistol",
        "first_name": "Eve"
    }
    url = conf['host'] + conf['urls']['register']
    response = requests.post(url, payload)
    create_data = response.json()
    print(create_data)
    assert 'id' in create_data
    assert 'token' in create_data
    assert response.status_code == 200

    payload = {
        "email": "eve.holt@reqres.in",
    }
    url = conf['host'] + conf['urls']['register']
    response = requests.post(url, payload)
    create_data = response.json()
    print(create_data)
    assert 'error' in create_data
    assert response.status_code == 400


def test_login():
    conf = utils.get_test_config()
    payload = {
        "email": "eve.holt@reqres.in",
        "password": "pistol",
        "first_name": "Eve"
    }
    url = conf['host'] + conf['urls']['register']
    response = requests.post(url, payload)
    create_data = response.json()
    print(create_data)
    assert 'token' in create_data
    assert response.status_code == 200

    payload = {
        "email": "eve.holt@reqres.in",
    }
    url = conf['host'] + conf['urls']['register']
    response = requests.post(url, payload)
    create_data = response.json()
    print(create_data)
    assert 'error' in create_data
    assert response.status_code == 400
