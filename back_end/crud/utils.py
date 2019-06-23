import string
import random


def generate_random_token():
    token_length = 17
    token = ''

    while len(token) < token_length:
        token_characters = [
            random.choice(string.ascii_letters),
            str(random.randint(0, 9))
        ]
        token += token_characters[random.randint(0, 1)]

    return token
