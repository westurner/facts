#!/usr/bin/env python
# encoding: utf-8
from __future__ import print_function
"""
progname
"""




import BeautifulSoup
from IPython.external.path import path
import logging

DATAPATH = path('~/workspace/math/facts/data').expanduser()
def parse_tax_rates_table():
    # https://en.wikipedia.org/wiki/Income_tax_in_the_United_States
    datapath = DATAPATH / 'taxes'
    htmlpath = datapath / 'Income tax in the United States - Wikipedia, the free encyclopedia.html'
    bs = BeautifulSoup.BeautifulSoup(open(htmlpath))

    def find_unadjusted_table(bs):
        # TODO
        tables = bs.findAll('table')
        #print(len(tables))
        return tables[-2]

    table = find_unadjusted_table(bs)

    row = table.findAll('tr')[1]
    headings = tuple(col.text for col in row.findAll('th'))
    print(headings)
    yield (headings)

    for row in table.findAll('tr')[2:]:
        yeartext = row.find('th').text
        start = end = None
        try:
            year = int(yeartext)
            start = end = year
        except ValueError,e:
            yearrange = yeartext.split(u'\u2013')
            if yearrange[1:]:
                start,end = [int(yr) for yr in yearrange]
                if len(str(end)) == 2:
                    end = int( str(start)[:2] + str(end) )
            else:
                logging.error("couldn't parse: %r" % yeartext)
                logging.exception(e)
                raise
        for year in xrange(start,end+1):
            yield (
                (year,) + tuple(
                    float(col.text[:-1]) for col in row.findAll('td'))
                )


import unittest
class TestParseTaxes(unittest.TestCase):
    def test_parse_tax_rates_table(self):
        # TODO
        for row in parse_tax_rates_table():
            print(row)

    def test_to_dataframe(self):
        df, df2 = to_dataframe(parse_tax_rates_table())
        print(df)
        print(df2)
        #is_index_complete(df.index)

        raise

from pprint import pformat
def is_index_complete(index):
    start, end = index[0], index[-1]
    sequential = range(start,end+1)
    actual = list(index)
    compare = zip(sequential, actual)
    for s,a in compare:
        if s != a:
            logging.error("%s != %s" % (s,a))
            logging.error(pformat(compare))
            return False
    return True

from pandas import DataFrame, Index

def to_dataframe(iterable):
    data = list(iterable)
    columns = data[0]
    print(columns)
    df = DataFrame.from_records(data[1:],
            index=u'Year',
            columns=columns)

    # TODO: NOTE:
    df2 = df.reindex(
        index=Index(range(df.index[0],df.index[-1]+1)),
        method='ffill') # 'ffill'

    return df, df2
