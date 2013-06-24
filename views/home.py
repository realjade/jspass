# -*- coding: utf-8 -*-
from flask import Blueprint
from flask import request, session, url_for, redirect, \
        render_template, abort, g, flash, json, Response, make_response, current_app,send_file
import models as m
from models.user import User
from werkzeug import check_password_hash, generate_password_hash
from werkzeug import secure_filename
from sqlalchemy import or_,desc
import time
import pickle
import lib.utils as ut
from lib.wrappers import login_required
import lib.functions as f
from lib import const
import lib.datawrappers as dw
import os
import string
from random import choice
import types
import Image

# Flask 模块对象
module = Blueprint('home', __name__)


@module.route('/home/', methods=['GET', 'POST'])
def home():
    """index"""
    return render_template('index.html')

@module.route('/share/<share_id>/', methods=['GET', 'POST'])
def share(share_id = None):
    error = None
    codeshare = None
    code = None
    if share_id:
        codeshare = f.get_codeshare(share_id)
        if codeshare:
            option = False
            share = dw.wrap_codeshare(codeshare.CodeShare,{code:False})
            code = dw.wrap_code(codeshare.Code)
    print code
    return render_template('code/share.html',tab='index', codeshare = share, code = code, error = error)

@module.route('/html5/', methods=['GET', 'POST'])
def html5():
    """index"""
    return render_template('html5/html5.html',tab = 'html5')

@module.route('/discuss/', methods=['GET', 'POST'])
def discuss():
    """index"""
    return render_template('discuss.html',tab = 'discuss')

@module.route('/example/', methods=['GET', 'POST'])
def example():
    """index"""
    return render_template('example.html',tab = 'example')


@module.route('/resource/', methods=['GET', 'POST'])
@module.route('/resource/<filter>/', methods=['GET', 'POST'])
def resource(filter=None):
    """index"""
    return render_template('resource.html',tab = 'resource')