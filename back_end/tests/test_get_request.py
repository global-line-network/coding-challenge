import requests
from . import utils


def initialize_list_data():
    conf = utils.get_test_config()
    payloads = [
        {"email": "george.bluth@reqres.in", "first_name": "George", "last_name": "Bluth",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"},
        {"email": "janet.weaver@reqres.in", "first_name": "Janet", "last_name": "Weaver",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"},
        {"email": "emma.wong@reqres.in", "first_name": "Emma", "last_name": "Wong",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"},
        {"email": "eve.holt@reqres.in", "first_name": "Eve", "last_name": "Holt",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"},
        {"email": "charles.morris@reqres.in", "first_name": "Charles", "last_name": "Morris",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"},
        {"email": "tracey.ramos@reqres.in", "first_name": "Tracey", "last_name": "Ramos",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"},
        {"email": "michael.lawson@reqres.in", "first_name": "Michael", "last_name": "Lawson",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"},
        {"email": "lindsay.ferguson@reqres.in", "first_name": "Lindsay", "last_name": "Ferguson",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"},
        {"email": "tobias.funke@reqres.in", "first_name": "Tobias", "last_name": "Funke",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"},
        {"email": "byron.fields@reqres.in", "first_name": "Byron", "last_name": "Fields",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"},
        {"email": "george.edwards@reqres.in", "first_name": "George", "last_name": "Edwards",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"},
        {"email": "rachel.howell@reqres.in", "first_name": "Rachel", "last_name": "Howell",
         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg"}
    ]

    url = conf['host'] + conf['urls']['users'] + '?page=1'
    response = requests.get(url)
    resp_data = response.json()

    if len(resp_data['data']) <= 0 and resp_data['total'] == 0:
        url = conf['host'] + conf['urls']['users']
        for payload in payloads:
            response = requests.post(url, payload)
            create_data = response.json()
            print(create_data)


def initialize_resources_list_data():
    conf = utils.get_test_config()
    payloads = [
        {"id": 1, "name": "cerulean", "year": 2000, "color": "#98B2D1", "pantone_value": "15-4020"},
        {"id": 2, "name": "fuchsia rose","year": 2001,"color": "#C74375","pantone_value": "17-2031"},
        {"id": 3, "name": "true red", "year": 2002, "color": "#BF1932", "pantone_value": "19-1664"},
        {"id": 4, "name": "aqua sky", "year": 2003, "color": "#7BC4C4", "pantone_value": "14-4811"},
        {"id": 5, "name": "tigerlily", "year": 2004, "color": "#E2583E", "pantone_value": "17-1456"},
        {"id": 6, "name": "blue turquoise", "year": 2005, "color": "#53B0AE", "pantone_value": "15-5217"},
        {"id": 7, "name": "sand dollar", "year": 2006, "color": "#DECDBE", "pantone_value": "13-1106"},
        {"id": 8, "name": "chili pepper", "year": 2007, "color": "#9B1B30", "pantone_value": "19-1557"},
        {"id": 9, "name": "blue iris", "year": 2008, "color": "#5A5B9F", "pantone_value": "18-3943"},
        {"id": 10, "name": "mimosa", "year": 2009, "color": "#F0C05A", "pantone_value": "14-0848"},
        {"id": 11, "name": "turquoise", "year": 2010, "color": "#45B5AA", "pantone_value": "15-5519"},
        {"id": 12, "name": "honeysuckle", "year": 2011, "color": "#D94F70", "pantone_value": "18-2120"}
    ]

    url = conf['host'] + conf['urls']['unknown'] + '?page=1'
    response = requests.get(url)
    resp_data = response.json()

    if len(resp_data['data']) <= 0 and resp_data['total'] == 0:
        url = conf['host'] + conf['urls']['unknown']
        for payload in payloads:
            response = requests.post(url, payload)
            create_data = response.json()
            print(create_data)


def test_list_users():
    conf = utils.get_test_config()
    page_ctr = 1
    pages = 1
    initialize_list_data()

    while page_ctr <= pages:
        url = conf['host'] + conf['urls']['users'] + '?page=' + str(page_ctr)
        response = requests.get(url)
        resp_data = response.json()
        assert resp_data['page'] == page_ctr
        assert response.status_code == 200
        pages = resp_data['total_pages']
        page_ctr += 1


def test_get_user():
    conf = utils.get_test_config()
    initialize_list_data()
    url = conf['host'] + conf['urls']['users'] + '/1'
    response = requests.get(url)
    assert response.status_code == 200


def test_list_resources():
    conf = utils.get_test_config()
    page_ctr = 1
    pages = 1
    initialize_resources_list_data()

    while page_ctr <= pages:
        url = conf['host'] + conf['urls']['unknown'] + '?page=' + str(page_ctr)
        response = requests.get(url)
        resp_data = response.json()
        assert resp_data['page'] == page_ctr
        assert response.status_code == 200
        pages = resp_data['total_pages']
        page_ctr += 1


def test_get_resource():
    conf = utils.get_test_config()
    initialize_resources_list_data()
    url = conf['host'] + conf['urls']['unknown'] + '/1'
    response = requests.get(url)
    print(response.json())
    assert response.status_code == 200
