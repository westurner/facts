
import datetime
import re
import subprocess
month_rgx = re.compile(r'^\s?(\w+\s*\d{4})\s+(.*)[\n]?')

columns = [
    'month',
    'death_army',
    'death_navy',
    'death_usmc',
    'death_usaf',
    'death_total',
    'accident_army',
    'accident_navy',
    'accident_usmc',
    'accident_usaf',
    'accident_total',
    'total_death_army',
    'total_death_navy',
    'total_death_usmc',
    'total_death_usaf',
    'total_death_total',
    'wounded_army',
    'wounded_navy',
    'wounded_usmc',
    'wounded_usaf',
    'wounded_total',
]

OPERATIONS={
        'oef': 'Operation Enduring Freedom',
        'ond': 'Operation New Dawn',
        'oif': 'Operation Iraqi Freedom'
}
def get_monthly_report(operation):
    operation = operation.lower()
    if operation not in OPERATIONS:
        raise Exception()
    url = (
        "https://www.dmdc.osd.mil/dcas/pages/report_%s_month.xhtml" %
        operation)
    import webbrowser
    webbrowser.open(url)
    print("Click the Download Reports PDF icon")
    return None

PDFTOTEXT='/usr/bin/pdftotext'
def convert_to_txt(path):
    ret = subprocess.call(
        (PDFTOTEXT, '-layout', path))
    newpath = path.split('.',-1)[0]+'.txt'
    return ret, newpath

def parse_dcas_monthly(path):
    """parse output from ``pdftotext -layout ./***Monthly.pdf``

    line 0: U.S. Military Casualties - (?P=<title>.*)
    line 1: Summary by Month and Service*
    line 2: (As of: %B %d, %Y)"""
    yield columns
    for n,l in enumerate(open(path)):
        if n >= 9:
            match = month_rgx.match(l)
            if match:
                month,data = match.groups()
                month_date = datetime.datetime.strptime(
                        '-'.join( month.lower().split() ), '%B-%Y')
                data = tuple(data.split())
                yield (month_date,) + data
            #else:
            #    print('#', l)

#!apt-get install poppler-utils
#!pdftotext -layout ./OEFMonthly.pdf
for l in parse_dcas_monthly('./OEFMonthly.txt'):
    print l
